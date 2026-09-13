import { PropsWithChildren, useMemo } from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import { themeOverrides } from 'theme/theme';
import createTypography from 'theme/typography';
import { useSettingsContext } from './SettingsProvider';

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const {
    config: { fontFamily },
  } = useSettingsContext();

  const typography = useMemo(() => createTypography(fontFamily), [fontFamily]);

  const theme = createTheme({
    palette: {
      // Force light mode and white backgrounds regardless of browser or OS dark mode
      mode: 'light',
      background: {
        default: '#ffffff',
        paper: '#ffffff',
      },
      text: {
        primary: '#000000',
        secondary: '#333333',
      },
    },
    typography,
    ...themeOverrides,
  });

  return (
    <MuiThemeProvider disableTransitionOnChange theme={theme} modeStorageKey="sumk9-mode">
      <CssBaseline enableColorScheme />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
