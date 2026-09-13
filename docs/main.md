# `src/main.tsx`

Purpose:
- App entrypoint: mounts React app into DOM and wires top-level providers.

When it's used:
- Executed on client startup by Vite when the page loads.

Exports:
- Default: none (side-effectful bootstrap).

Notes:
- Contains `ThemeProvider` and `SettingsProvider` wrappers; changes here affect global app behavior.
