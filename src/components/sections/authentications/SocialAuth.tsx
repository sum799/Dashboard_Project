import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Alert, Button, Stack } from '@mui/material';
import {
  GOOGLE_CLIENT_ID,
  checkUserExistsInExcel,
  clearStoredAuthUser,
  decodeGoogleJwt,
  setStoredAuthUser,
} from 'lib/googleAuth';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: (callback?: (notification: any) => void) => void;
        };
      };
    };
  }
}

const SocialAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) {
      return;
    }

    const scriptId = 'google-oauth-script';
    const existingScript = document.getElementById(scriptId);

    if (!existingScript) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleGoogleLogin = async () => {
    if (!GOOGLE_CLIENT_ID) {
      setError('Google Client ID is missing. Add VITE_GOOGLE_CLIENT_ID in the environment file.');
      return;
    }

    if (!window.google?.accounts?.id) {
      setError('Google sign-in script is still loading. Please try again in a moment.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await new Promise<{ credential: string }>((resolve, reject) => {
        const google = window.google;

        if (!google?.accounts?.id) {
          reject(
            new Error('Google sign-in script is still loading. Please try again in a moment.'),
          );
          return;
        }

        google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: (credentialResponse: { credential: string }) => resolve(credentialResponse),
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        google.accounts.id.prompt((notification: any) => {
          if (notification?.isNotDisplayed?.() || notification?.isSkippedMoment?.()) {
            reject(new Error('Google sign-in was cancelled or not displayed.'));
          }
        });
      });

      const payload = decodeGoogleJwt(response.credential);
      const googleUserId = payload.sub || payload.email;

      if (!googleUserId) {
        throw new Error('Google account ID was not returned.');
      }

      const isAllowed = await checkUserExistsInExcel(googleUserId);

      if (isAllowed) {
        setStoredAuthUser({
          email: payload.email || googleUserId,
          name: payload.name || 'Google User',
          googleUserId,
        });
        navigate('/');
      } else {
        clearStoredAuthUser();
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Google sign-in failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={2}>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        size="large"
        onClick={handleGoogleLogin}
        disabled={loading}
        sx={{
          py: 1.5,
          fontWeight: 700,
        }}
      >
        {loading ? 'Signing in...' : 'Continue with Google'}
      </Button>

      {error && (
        <Alert severity="error" variant="filled">
          {error}
        </Alert>
      )}
    </Stack>
  );
};

export default SocialAuth;
