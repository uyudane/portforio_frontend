import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#143F6B',
    },
    secondary: {
      main: '#E8630A',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: [
      'Helvetica Neue',
      'Helvetica',
      'Hiragino Sans',
      'Arial',
      'Hiragino Kaku Gothic ProN',
      'Yu Gothic',
      'Meiryo',
      'sans-serif',
    ].join(','),
    // ボタンの文字がデフォルトで大文字になっているため、小文字も許可
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;
