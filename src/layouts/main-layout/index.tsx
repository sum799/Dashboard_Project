import { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppBar from 'layouts/main-layout/app-bar';
// File header: Main layout — arranges the app shell including AppBar, Footer,
// and main content area. Controls layout-level wrappers and should be used by
// the route structure to present consistent scaffolding.
import Footer from './footer';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', zIndex: 1, position: 'relative' }}>
        <AppBar />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 0,
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            ml: 0,
          }}
        >
          <Toolbar variant="appbar" />

          <Box sx={{ flex: 1 }}>
            <Box
              sx={[
                {
                  height: 1,
                  bgcolor: 'background.default',
                },
              ]}
            >
              {children}
            </Box>
          </Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
