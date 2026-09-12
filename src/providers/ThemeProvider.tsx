import { PropsWithChildren, useMemo } from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import { themeOverrides } from 'theme/theme';
import createTypography from 'theme/typography';
import { useSettingsContext } from './SettingsProvider';

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const {
    config: { fontFamily, darkMode },
  } = useSettingsContext();

  const typography = useMemo(() => createTypography(fontFamily), [fontFamily]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
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
