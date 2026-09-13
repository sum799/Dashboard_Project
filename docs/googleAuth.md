# `src/lib/googleAuth.ts`

Purpose:
- LocalStorage-based auth session utilities: store, retrieve, clear auth user, session expiry logic, and Apps Script helpers.

When it's used:
- Used by login flows, profile checks, and session expiry enforcement across the app.

Notes:
- Contains `AUTH_SESSION_TIMEOUT_MS` and `AUTH_USER_KEY` constants. Keep API changes backward compatible.
