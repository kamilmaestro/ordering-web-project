import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[700],
    },
    secondary: {
      main: '#ffffff',
    },
    text: {
      primary: "#37474f",
    },
  },
  typography: {
    "fontFamily": `"lato", sans-serif`,
    "fontStyle": "normal",
    "fontWeightLight": 100,
    "fontWeightRegular": 200,
    "fontWeightMedium": 500,
    "color": "#ff0000"
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: "1em"
      }
    }
  }
});