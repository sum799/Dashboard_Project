import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles';
import keyFrames from 'theme/styles/keyFrames';
import popper from 'theme/styles/popper';
import simplebar from 'theme/styles/simplebar';

const CssBaseline: Components<Omit<Theme, 'components'>>['MuiCssBaseline'] = {
  defaultProps: {},
  styleOverrides: (theme) => ({
    // Global overrides to force a white background and improve mobile responsiveness
    html: {
      height: '100%',
    },
    '#root': {
      minHeight: '100%',
    },
    '*': {
      boxSizing: 'inherit',
      scrollbarWidth: 'thin',
    },
    img: {
      maxWidth: '100%',
      height: 'auto',
      display: 'block',
    },
    body: {
      height: '100% !important',
      margin: 0,
      backgroundColor: '#ffffff !important',
      color: '#000000 !important',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      boxSizing: 'border-box',
      overflowX: 'hidden',
      scrollbarColor: `${theme.vars.palette.background.elevation4} transparent`,
      [`h1, h2, h3, h4, h5, h6, p`]: {
        margin: 0,
      },
      fontVariantLigatures: 'none',
      [`[id]`]: {
        scrollMarginTop: 82,
      },
    },
    ...simplebar(theme),
    ...keyFrames(),
    ...popper(theme),
  }),
};

export default CssBaseline;
