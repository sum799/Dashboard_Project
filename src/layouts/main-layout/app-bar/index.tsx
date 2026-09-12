import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Box, Button, Stack, Typography, paperClasses } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { getStoredAuthUser } from 'lib/googleAuth';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import Logo from 'components/common/Logo';
import AppbarActionItems from '../common/AppbarActionItems';

const AppBar = () => {
  const navigate = useNavigate();
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const isAuthenticated = !!getStoredAuthUser();

  useEffect(() => {
    if (!isAuthenticated) {
      setElapsedSeconds(0);
      return;
    }

    const startTime = Date.now();

    const timer = window.setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isAuthenticated]);

  const formatTime = (totalSeconds: number) => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <MuiAppBar
      position="fixed"
      sx={{
        width: '100%',
        ml: 0,
        borderBottom: `1px solid`,
        borderColor: 'divider',
        [`&.${paperClasses.root}`]: {
          outline: 'none',
        },
      }}
    >
      <Toolbar variant="appbar" sx={{ px: { xs: 3, md: 5 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
          <Logo showName />
        </Box>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            minWidth: 0,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              color: 'text.secondary',
              whiteSpace: 'nowrap',
              fontWeight: 600,
            }}
          >
            <IconifyIcon icon="material-symbols:timer-outline-rounded" sx={{ fontSize: 18 }} />
            {isAuthenticated ? formatTime(elapsedSeconds) : '00:00:00'}
          </Typography>
        </Stack>

        {!isAuthenticated && (
          <Button variant="contained" size="small" onClick={() => navigate(paths.login)}>
            Login
          </Button>
        )}

        <AppbarActionItems />
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
