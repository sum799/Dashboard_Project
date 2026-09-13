# `src/layouts/main-layout/common/ProfileMenu.tsx`

Purpose:
- Renders the profile avatar button and dropdown menu; handles sign-in/out and opening Account Settings dialog.

When it's used:
- Included in the AppBar; user interactions trigger account-level actions.

Notes:
- Now includes logic to fetch user profile from Apps Script and renders `UserProfileDialog`.
