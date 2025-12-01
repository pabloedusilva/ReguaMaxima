Shared assets for the entire app (client + future dashboard).

Structure:
- images/
  - logos/: Brand logos (SVG/PNG), favicon assets
  - services/: Service thumbnails, category images
  - professionals/: Barber profile photos/avatars
  - ui/: Generic UI visuals (placeholders, backgrounds)
  - icons/: SVG icons used across pages

Usage:
- In React/Vite, reference public assets via absolute paths: `/assets/images/logos/brand.svg`.
- Prefer SVG for logos and icons where possible.
- Keep filenames lowercase, kebab-case.

Conventions:
- logos: `brand.svg`, `brand-dark.svg`, `favicon-32.png`, `favicon-192.png`
- services: `corte-masculino.jpg`, `barba.jpg`, `sobrancelha.jpg`
- professionals: `pablo-do-corte.jpg`, `joao-fade.jpg`
- ui: `placeholder-service.png`, `placeholder-profile.png`
- icons: `calendar.svg`, `whatsapp.svg`, `instagram.svg`
