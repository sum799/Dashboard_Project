# `src/App.tsx`

Purpose:

- Application shell: handles global auth gate, route outlet, and global side-effects like scroll reset.

When it's used:

- This component is rendered by `src/main.tsx` and wraps route `Outlet` content.

Notes:

- Controls the preview/blur overlay used when the user is unauthenticated.
