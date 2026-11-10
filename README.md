# Pablo Dev Garrido — Portfolio

Portfolio estático creado con Astro y TypeScript. El contenido de proyectos vive en `src/data/projects.ts`: para agregar uno nuevo, incorporar otro objeto con la misma forma; la grilla se actualiza sin modificar componentes.

## Desarrollo

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Formulario de contacto

El sitio se mantiene estático: el único endpoint dinámico es `POST /api/contact` (`src/pages/api/contact.ts`, con `prerender = false`). El formulario de `src/components/ContactSection.astro` envía JSON y el endpoint responde siempre JSON:

| Código | `error` | Cuándo |
| --- | --- | --- |
| 200 | — | envío correcto (`{ ok: true }`) |
| 200 | — | honeypot completado o envío en menos de 3 s (respuesta silenciosa) |
| 400 | `invalid_name`, `invalid_email`, `invalid_type`, `invalid_message`, `invalid_body` | datos inválidos |
| 400 | `captcha` | falta el token de Turnstile o Cloudflare lo rechazó |
| 403 | `forbidden` | `Origin` fuera de la allowlist (`excengarrido.dev`, `www.excengarrido.dev`, `localhost`) |
| 413 | `payload_too_large` | body mayor a 8 KB |
| 415 | `unsupported_media_type` | `Content-Type` distinto de `application/json` |
| 500 | `server` | sin proveedor de correo configurado o fallo del envío |

### Variables de entorno

| Variable | Requerida | Uso |
| --- | --- | --- |
| `GMAIL_USER` | sí (vía SMTP) | cuenta que envía y destinatario por defecto |
| `GMAIL_APP_PASSWORD` | sí (vía SMTP) | App Password de Gmail de 16 caracteres (requiere 2FA; los espacios se ignoran) |
| `CONTACT_TO` | no | destinatario; si falta se usa `GMAIL_USER` |
| `RESEND_API_KEY` | no | si está definida se envía por HTTPS con Resend en lugar de SMTP |
| `RESEND_FROM` | no | remitente verificado en Resend (por defecto `Portafolio <onboarding@resend.dev>`) |
| `PUBLIC_TURNSTILE_SITEKEY` | no | sitekey pública de Cloudflare Turnstile; si falta, el widget no se renderiza |
| `TURNSTILE_SECRET_KEY` | no | secret de Turnstile; si falta, el endpoint no exige captcha |

Las variables están declaradas en `env.schema` como opcionales, por lo que el build no falla si faltan. `.env` no se versiona: usá `.env.example` como plantilla.

### Protección anti-bot (Cloudflare Turnstile)

- El widget se renderiza sólo si `PUBLIC_TURNSTILE_SITEKEY` parece una sitekey válida (`0x…` o `1x…`); con la variable vacía o un placeholder el formulario sigue funcionando sin captcha.
- El endpoint verifica el token contra `https://challenges.cloudflare.com/turnstile/v0/siteverify` sólo si `TURNSTILE_SECRET_KEY` está definida. Si Cloudflare no responde, el envío se rechaza (`500 server`) para no dejar pasar bots.
- Hostnames que deben estar autorizados en el widget de Cloudflare: `excengarrido.dev`, `www.excengarrido.dev`, `localhost` y el dominio de las previews (`*.vercel.app`).
- Antes del captcha actúan el honeypot y el envío en menos de 3 s, que responden `200 { ok: true }` en silencio.

## Deploy en Vercel

El adapter `@astrojs/vercel` deja las páginas como estáticas y genera una sola función serverless para `/api/contact`.

1. Cargar las variables en el dashboard del proyecto (Settings → Environment Variables), en Production, Preview y Development: `CONTACT_TO`, `PUBLIC_TURNSTILE_SITEKEY`, `TURNSTILE_SECRET_KEY` y `RESEND_API_KEY` (+ `RESEND_FROM` si verificaste el dominio). `PUBLIC_TURNSTILE_SITEKEY` se inyecta en el build: si la agregás después, hay que redeployar.
2. **En el plan Hobby, Vercel bloquea los puertos SMTP 25/465/587**, así que Gmail SMTP no funciona en producción. Definí `RESEND_API_KEY` (y `RESEND_FROM` con un dominio verificado) para enviar por HTTPS; con Pro/Enterprise podés quedarte sólo con SMTP.
3. Los logs del endpoint no incluyen datos personales: sólo `[contact]` con el proveedor y el código de error.

