import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    success: {
      main: '#52c41a'
    },
    warning: {
      main: '#faad14'
    },
    error: {
      main: red.A400,
    },
  },
  components: {

  }
});

export default theme;
