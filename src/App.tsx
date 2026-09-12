import { useEffect, useLayoutEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { Box, Button, Stack, Typography } from '@mui/material';
import { getStoredAuthUser } from 'lib/googleAuth';
import { useSettingsContext } from 'providers/SettingsProvider';
import { REFRESH } from 'reducers/SettingsReducer';
import paths from 'routes/paths';

const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { configDispatch } = useSettingsContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useLayoutEffect(() => {
    configDispatch({ type: REFRESH });
  }, []);

  const showAuthGate = !pathname.startsWith('/auth') && !getStoredAuthUser();

  return (
    <Box sx={{ position: 'relative' }}>
      <Outlet />

      {showAuthGate && (
        <Box
          sx={{
            position: 'fixed',
            top: 72,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(15, 23, 42, 0.24)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <Stack alignItems="center" spacing={2} sx={{ textAlign: 'center', px: 3 }}>
            <Typography variant="h4" sx={{ color: 'common.white', fontWeight: 700 }}>
              Please sign in
            </Typography>
            <Typography variant="body2" sx={{ color: 'common.white', opacity: 0.9 }}>
              View the dashboard and continue after authentication.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate(paths.login)}
              sx={{ minWidth: 180 }}
            >
              Sign In
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default App;
