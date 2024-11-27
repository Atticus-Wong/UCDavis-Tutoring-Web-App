import { createTheme } from '@mui/material';
import { BRAND_COLOR } from '../utils/constants';

export const theme = createTheme({
  typography: {
    fontSize: 16,
    h1: {
      fontSize: '2.5rem'
    },
    h2: {
      fontSize: '2rem',
    },
    h3: {
      fontSize: '1.5rem'
    },
    h4: {
      fontSize: '1.4rem'
    },
    body1: {
      fontSize: '1rem'
    },
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    mode: 'dark',
    primary: {
      main: BRAND_COLOR,
    },
    secondary: {
      main: '#f50057'
    },
    background: {
      default: '#191918',
      paper: '#1e1e1e'
    },
    text: {
      primary: '#F7F7F7',
      secondary: '#FFDE28'
    }
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: {
          '@media (max-width:960px)': {
            fontsize: '2.25rem',
          },
          '@media (max-width:600px)': {
            fontSize: '2rem'
          },
        },
        h2: {
          '@media (max-width:960px)': {
            fontsize: '1.75rem',
          },
          '@media (max-width:600px)': {
            fontSize: '1.5rem'
          },
        },
        h3: {
          '@media (max-width:960px)': {
            fontsize: '1.5rem',
          },
          '@media (max-width:600px)': {
            fontSize: '1.25rem'
          },
        },
        h4: {
          '@media (max-width:960px)': {
            fontsize: '1.2rem',
          },
          '@media (max-width:600px)': {
            fontSize: '1rem'
          },
        },
        body1: {
          '@media (max-width:960px)': {
            fontsize: '0.85rem',
          },
          '@media (max-width:600px)': {
            fontSize: '0.85rem'
          },
        },
      }
    }
  }
});
