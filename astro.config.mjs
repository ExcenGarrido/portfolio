import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://excengarrido.dev',
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: false
    }
  },
  integrations: [sitemap()],
  adapter: vercel(),
  env: {
    schema: {
      PUBLIC_TURNSTILE_SITEKEY: envField.string({ context: 'client', access: 'public', optional: true }),
      TURNSTILE_SECRET_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      GMAIL_USER: envField.string({ context: 'server', access: 'secret', optional: true }),
      GMAIL_APP_PASSWORD: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_TO: envField.string({ context: 'server', access: 'secret', optional: true }),
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      RESEND_FROM: envField.string({ context: 'server', access: 'secret', optional: true })
    }
  },
  vite: {
    plugins: [tailwindcss()],
    server: { host: true, allowedHosts: true, strictPort: false }
  }
});
