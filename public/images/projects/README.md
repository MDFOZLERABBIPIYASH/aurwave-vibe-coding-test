# Project images

This folder holds the case-study visuals referenced from
`src/lib/projects.ts`. The Phase 08 placeholder implementation uses
calm gradient surfaces in code (no real images yet).

## When adding real images

- **Format:** AVIF or WebP. JPEG only for photographs.
- **Dimensions:** the homepage card and `/work` index card render
  at a 4:3 aspect ratio. Source images should be at least
  `1200×900` to look sharp on retina and large viewports.
- **File size:** keep each image under 200 KB. The build's
  per-route First Load budget is ~150 kB.
- **Naming:** `project-<slug>-<view>.webp` —
  e.g. `project-northwind-commerce-home.webp`.
- **Alt text:** every image must have descriptive `alt` text in
  the consuming component. The project catalog in
  `src/lib/projects.ts` does not yet carry per-image alt text —
  add a `gallery` field with `{ src, alt }` entries when wiring
  up real assets.

## License

Real project imagery must be either produced by Aurwave (preferred
— the studio commissions the hero shots for the cases it ships) or
licensed. Record the source and license in this file when an
image lands.

| File | Source | License | Notes |
|------|--------|---------|-------|
| _empty_ | — | — | — |
