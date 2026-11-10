import type { APIRoute } from 'astro';
import { CONTACT_TO, GMAIL_APP_PASSWORD, GMAIL_USER, RESEND_API_KEY, RESEND_FROM, TURNSTILE_SECRET_KEY } from 'astro:env/server';
import nodemailer from 'nodemailer';

export const prerender = false;

const MAX_BODY_BYTES = 8192;
const FROM_NAME = 'Portafolio';

type FormType = 'ai' | 'docs' | 'api' | 'job' | 'other';

const FIXED_ORIGINS = new Set(['excengarrido.dev', 'www.excengarrido.dev']);

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const PLACEHOLDER_RE = /peg[áa]_ac[áa]/i;

const runtimeEnv = (key: string) =>
  (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env?.[key] ?? '';

const isAllowedOrigin = (origin: string | null, requestUrl: string) => {
  if (!origin) return true;
  try {
    const source = new URL(origin);
    if (source.host === new URL(requestUrl).host) return true;
    if (FIXED_ORIGINS.has(source.host)) return true;
    if (/^(localhost|127\.0\.0\.1)(:\d+)?$/.test(source.host)) return true;
    return [runtimeEnv('VERCEL_URL'), runtimeEnv('VERCEL_BRANCH_URL'), runtimeEnv('VERCEL_PROJECT_PRODUCTION_URL')]
      .some((host) => host !== '' && host === source.host);
  } catch {
    return false;
  }
};

const verifyTurnstile = async (token: string, secret: string, remoteIp: string) => {
  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set('remoteip', remoteIp);
  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body,
  });
  return (await response.json()) as { success?: boolean; 'error-codes'?: string[] };
};

const SUBJECTS: Record<FormType, string> = {
  ai: 'Automatización de procesos con IA',
  docs: 'Procesamiento de documentos',
  api: 'Desarrollo de API backend',
  job: 'Oferta de empleo o entrevista',
  other: 'Consulta general',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const CONTROL_CHARS_RE = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g;

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

const clean = (value: unknown) =>
  typeof value === 'string' ? value.replace(CONTROL_CHARS_RE, '').trim() : '';

const headerSafe = (value: string) => value.replace(/[<>"]/g, '').trim();

const isFormType = (value: string): value is FormType => value in SUBJECTS;

export const POST: APIRoute = async ({ request }) => {
  if (!isAllowedOrigin(request.headers.get('origin'), request.url)) {
    return json({ ok: false, error: 'forbidden' }, 403);
  }

  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    return json({ ok: false, error: 'unsupported_media_type' }, 415);
  }

  const declaredLength = Number(request.headers.get('content-length') ?? '0');
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return json({ ok: false, error: 'payload_too_large' }, 413);
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return json({ ok: false, error: 'invalid_body' }, 400);
  }

  if (raw.length > MAX_BODY_BYTES) {
    return json({ ok: false, error: 'payload_too_large' }, 413);
  }

  let payload: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return json({ ok: false, error: 'invalid_body' }, 400);
    }
    payload = parsed as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: 'invalid_body' }, 400);
  }

  const name = clean(payload.name);
  const email = clean(payload.email);
  const type = clean(payload.type);
  const message = clean(payload.message);
  const honeypot = clean(payload.botcheck);
  const elapsed = typeof payload.elapsed === 'number' && Number.isFinite(payload.elapsed) ? payload.elapsed : null;

  if (honeypot !== '' || (elapsed !== null && elapsed < 3000)) {
    return json({ ok: true });
  }

  if (name.length < 2 || name.length > 100) {
    return json({ ok: false, error: 'invalid_name' }, 400);
  }
  if (email.length > 200 || !EMAIL_RE.test(email)) {
    return json({ ok: false, error: 'invalid_email' }, 400);
  }
  if (!isFormType(type)) {
    return json({ ok: false, error: 'invalid_type' }, 400);
  }
  if (message.length < 10 || message.length > 1000) {
    return json({ ok: false, error: 'invalid_message' }, 400);
  }

  const turnstileSecret = (TURNSTILE_SECRET_KEY || runtimeEnv('TURNSTILE_SECRET_KEY')).trim();
  const turnstileToken = typeof payload.turnstileToken === 'string' ? payload.turnstileToken.trim().slice(0, 2048) : '';
  console.log('[contact] Turnstile secret presente:', !!turnstileSecret, 'Token presente:', !!turnstileToken);
  if (turnstileSecret !== '' && !PLACEHOLDER_RE.test(turnstileSecret)) {
    if (!turnstileToken) {
      return json({ ok: false, error: 'captcha' }, 400);
    }
    const remoteIp = (request.headers.get('x-forwarded-for') ?? '').split(',')[0]?.trim() ?? '';
    try {
      const result = await verifyTurnstile(turnstileToken, turnstileSecret, remoteIp);
      if (!result.success) {
        console.error('[contact] turnstile rejected:', (result['error-codes'] ?? ['unknown']).join(','));
        return json({ ok: false, error: 'captcha' }, 400);
      }
    } catch (error) {
      console.error('[contact] turnstile verification failed:', error instanceof Error ? error.message : 'unknown error');
      return json({ ok: false, error: 'server' }, 500);
    }
  }

  const gmailUser = (GMAIL_USER ?? '').trim();
  const gmailPassword = (GMAIL_APP_PASSWORD ?? '').replace(/\s+/g, '');
  const resendKey = (RESEND_API_KEY ?? '').trim();
  const recipient = (CONTACT_TO ?? '').trim() || gmailUser;
  const safeName = headerSafe(name);
  const replyTo = safeName ? `${safeName} <${email}>` : email;
  const subject = `Portafolio: ${SUBJECTS[type]}`;
  const bodyText = [
    `Nombre: ${name}`,
    `Correo: ${email}`,
    `Tipo: ${SUBJECTS[type]}`,
    '',
    message,
  ].join('\n');

  if (resendKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          authorization: `Bearer ${resendKey}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          from: (RESEND_FROM ?? '').trim() || `${FROM_NAME} <onboarding@resend.dev>`,
          to: [recipient],
          reply_to: replyTo,
          subject,
          text: bodyText,
        }),
      });

      if (!response.ok) {
        const detail = (await response.text().catch(() => '')).replace(/\s+/g, ' ').slice(0, 200);
        console.error('[contact] resend rejected the message:', response.status, detail);
        return json({ ok: false, error: 'server' }, 500);
      }

      return json({ ok: true });
    } catch (error) {
      console.error('[contact] resend request failed:', error instanceof Error ? error.message : 'unknown error');
      return json({ ok: false, error: 'server' }, 500);
    }
  }

  if (!gmailUser || !gmailPassword) {
    console.error('[contact] no email provider is configured');
    return json({ ok: false, error: 'server' }, 500);
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user: gmailUser, pass: gmailPassword },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  try {
    await transporter.sendMail({
      from: `${FROM_NAME} <${gmailUser}>`,
      to: recipient,
      replyTo,
      subject,
      text: bodyText,
    });
  } catch (error) {
    const code = (error as { code?: string }).code ?? 'unknown';
    console.error('[contact] smtp sendMail failed:', code);
    return json({ ok: false, error: 'server' }, 500);
  }

  return json({ ok: true });
};
