import { createTheme } from '@mui/material';
import { BRAND_COLOR } from '../utils/constants';

export const theme = createTheme({
  typography: {
    fontSize: 16,
    h1: {
      fontSize: '2.5rem'
    },
    h2: {
      fontSize: '1.5rem',
    },
    h3: {
      fontSize: '1.25rem'
    },
    h4: {
      fontSize: '2rem'
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
});
