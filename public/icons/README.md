# Icons

The brand mark and wordmark live here:

- `aurwave-mark.svg` — the icon-only mark.
- `aurwave-logo.svg` — the horizontal wordmark lockup.

The same SVGs are inlined as React components in
`src/components/ui/Logo.tsx` for theming and bundling. Keep both
copies in sync.

UI icons (menu, close, arrows) live as inline React components in
`src/components/ui/Icon.tsx` and don't need a public file.
