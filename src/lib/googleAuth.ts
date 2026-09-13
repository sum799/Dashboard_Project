// File header: Authentication storage helpers. Provides a small wrapper around
// `localStorage` for storing and validating the authenticated user session.
// It centralizes keys, session expiry, and small utilities used by auth flows.
export const AUTH_USER_KEY = 'sumk9_google_user';
export const AUTH_SESSION_TIMEOUT_MS = 30 * 60 * 1000;
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
export const EXCEL_CHECK_URL =
  'https://script.google.com/macros/s/AKfycbzjK9Ds05636spMTLz1hfEfiYbFjTlI-_SHBKk_BCMXsH-JDyIK5HD8zE62QnjtgPje/exec';

export const getStoredAuthUser = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(AUTH_USER_KEY);
    if (!raw) {
      return null;
    }

    const user = JSON.parse(raw) as Record<string, string | number>;
    const expiresAt = Number(user?.expiresAt ?? 0);

    if (!expiresAt || Date.now() > expiresAt) {
      window.localStorage.removeItem(AUTH_USER_KEY);
      return null;
    }

    return user;
  } catch {
    window.localStorage.removeItem(AUTH_USER_KEY);
    return null;
  }
};

export const setStoredAuthUser = (user: Record<string, string>) => {
  if (typeof window === 'undefined') {
    return;
  }

  const safeUser: Record<string, string | number> = {
    ...user,
    expiresAt: Date.now() + AUTH_SESSION_TIMEOUT_MS,
  };

  window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(safeUser));
};

export const clearStoredAuthUser = () => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(AUTH_USER_KEY);
};

export const decodeGoogleJwt = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map((char) => `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join(''),
    );

    return JSON.parse(json) as { sub?: string; email?: string; name?: string };
  } catch (error) {
    console.error('Failed to decode Google JWT:', error);
    return {} as { sub?: string; email?: string; name?: string };
  }
};

export const checkUserExistsInExcel = async (userIdToSearch: string) => {
  try {
    const response = await fetch(EXCEL_CHECK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify({
        User_ID: userIdToSearch,
      }),
    });

    const data = await response.json();

    return String(data?.User_id ?? 'false').toLowerCase() === 'true';
  } catch (error) {
    console.error('Failed to connect to the Apps Script validation script:', error);
    return false;
  }
};
