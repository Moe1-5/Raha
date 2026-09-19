# Rihlat Al Raha

Mobile-first hotel marketing and reservation-request website built with React, TypeScript, Vite, Tailwind CSS, Lucide, and React Icons.

## Local development

Requirements: Node.js 20.19 or newer.

```bash
pnpm install
pnpm dev
```

Create a production build with:

```bash
pnpm build
pnpm preview
```

## Deploying to Vercel

Import this directory as a Vercel project. Vercel will use the included `vercel.json` configuration:

- Build command: `pnpm build`
- Output directory: `dist`
- Framework: Vite

The website is frontend-only and does not require environment secrets. If the primary WhatsApp number changes, add this public environment variable in Vercel:

```text
VITE_WHATSAPP_NUMBER=966509530219
```

Use the international number without `+`, spaces, or punctuation.

## How the WhatsApp integration works

The first release uses WhatsApp click-to-chat links:

```text
https://wa.me/<number>?text=<encoded-message>
```

The quick actions create a short localized message. The optional reservation form builds a detailed message containing the selected hotel, dates, room and guest counts, name, phone, and notes. The browser then opens WhatsApp or WhatsApp Web.

This is not the WhatsApp Business Cloud API. It:

- requires no backend, API token, Meta application, or webhook;
- does not send messages automatically—the visitor reviews and sends the message;
- cannot confirm delivery, synchronize conversations, or automate replies;
- stores no reservation data on the website.

A later phase can add the WhatsApp Business Cloud API through a server-side Vercel Function. API tokens must never be placed in `VITE_*` variables because those values are included in browser code.

## Content and language behavior

- Arabic, English, and Turkish interfaces are included.
- Arabic campaign graphics are used in Arabic and English.
- Turkish campaign graphics appear only when Turkish is selected.
- The selected language is saved in the visitor's browser.
