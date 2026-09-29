# Muhammed Faiha | Portfolio

Personal site for **Muhammed Faiha**, Backend and AI Engineer.

Live at **https://ziyaxoxo.github.io/portfolio/**

## Stack

Static HTML, CSS and vanilla JavaScript. No build step, no framework, no
dependencies. Served straight from GitHub Pages.

```
index.html    structure and content
style.css     design tokens, layout, light and dark themes
script.js     theme toggle, mobile nav, reveal, carousel, scroll spy
faiha.jpg     portrait
```

## Design

Editorial and restrained. Serif display type against a neutral sans, generous
whitespace, hairline rules, and a single muted gold accent. No gradients, no
glow, no scroll-jacking, and no motion beyond a short fade on reveal.

### Typography

| Role | Face |
|---|---|
| Display and headings | EB Garamond |
| Body and UI | IBM Plex Sans |
| Labels, indices, metadata | IBM Plex Mono |

### Colour

| Token | Dark | Light |
|---|---|---|
| Background | `#1c1c1c` | `#f7f5f1` |
| Surface | `#262626` | `#ffffff` |
| Body text | `#d4c5b0` | `#4a453d` |
| Heading text | `#e6dac6` | `#262320` |
| Muted text | `#9c9384` | `#6f6759` |
| Accent | `#bfa181` | `#7d6444` |
| On accent | `#1c1c1c` | `#fdfbf7` |
| Border | `#33302b` | `#e2ddd3` |

Every text and background pair meets WCAG 2.1 AA contrast in both themes. The
lowest measured ratio is 4.93:1.

## Theme

Defaults to the operating system preference via
`prefers-color-scheme`, then stores the visitor's choice in `localStorage` under
`mf-theme`. An inline script in `<head>` applies the stored theme before first
paint so there is no flash of the wrong mode.

## Accessibility

- Skip link, semantic landmarks, one `h1`, ordered heading levels
- Visible focus rings, `aria-current` on the active nav item
- Labelled icon buttons, `aria-expanded` on the menu toggle
- Decorative icons hidden with `aria-hidden`
- Full `prefers-reduced-motion` support
- Lighthouse scores 100 for accessibility, best practices and SEO

## Updating content

All content lives in `index.html`.

- **Resume link:** the hero button points at
  `https://drive.google.com/file/d/1dOBklVKI4LUxMr7Uxa4knS0ohVKwkYxW/view`.
  It is marked with an HTML comment reading
  `PASTE YOUR RESUME URL HERE` so it is easy to find. If the file is replaced in
  Drive and the link breaks, open the folder, click the file, then use
  Share and copy the link.
- **Featured projects:** the four entries inside `<div class="featured">`.
- **Other work:** the cards inside `<ul class="carousel-track">`.

To deploy, push to the `main` branch. GitHub Pages serves it from the repo root.

## Links

- GitHub: https://github.com/Ziyaxoxo
- LinkedIn: https://www.linkedin.com/in/muhammed-faiha
- Email: mdfaiha.official@gmail.com

## Licence

MIT
