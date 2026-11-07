# Alpha Vision

A responsive vision-care website for Alpha Vision, built with React, TypeScript, Vite, Framer Motion, and Lucide.

## Run locally

```bash
npm install
npm run dev
```

Create and preview a production build:

```bash
npm run build
npm run preview
```

## Business details

Update the professional profile, 14 service descriptions, locations, and telephone links in `src/data/business.ts`.

The appointment form validates its fields in the browser and prepares an inquiry for WhatsApp. It does not submit to a backend. No WhatsApp-enabled Alpha Vision number was supplied, so the form opens WhatsApp's recipient picker and asks the user to select a verified Alpha Vision contact. To enable direct chat, set `business.whatsappNumber` in `src/data/business.ts` to a verified international number using digits only, including the country code.

The supplied Alpha Vision logo, optometrist portrait, and eyewear photographs are in `src/assets/originals/`. The logo's responsive WebP variants and the photographs' responsive WebP and JPEG versions are generated in `public/images/`; the logo also has a PNG fallback at `public/alpha-vision-logo.png`. After replacing a source image, run `npm run optimize:images` to regenerate the responsive formats and sizes. Images are served locally rather than fetched from an image CDN at runtime. Sources and license information are listed in [IMAGE-CREDITS.md](./IMAGE-CREDITS.md).

## Motion

The installed `animated-website` skill is intended for video-driven, frame-by-frame scroll experiences and requires a supplied MP4. No video was provided, so the site uses only the applicable guidance: restrained entrance and viewport animations, transform/opacity transitions, and reduced-motion support. Video-specific frame extraction and full-screen scroll sequences were not used.
