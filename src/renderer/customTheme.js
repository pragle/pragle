import { createMuiTheme } from '@material-ui/core/styles/index'

export const customTheme = createMuiTheme({
  /*palette: {
    type: 'dark',
  },*/
  palette: {
    common: {
      black: '#000',
      white: '#000',
    },
    background: {
      default: '#000',
      paper: '#000',
    },
    augmentColor: (color) => {
      console.log('augmentColor', arguments);
      return '#000';
    },
    grey: {
      "50":'#000',//"#fafafa",
      "100":'#000',//"#f5f5f5",
      "200":'#000',//"#eeeeee",
      "300":'#000',//"#e0e0e0",
      "400":'#000',//"#bdbdbd",
      "500":'#000',//"#9e9e9e",
      "600":'#000',//"#757575",
      "700":'#000',//"#616161",
      "800":'#000',//"#424242",
      "900":'#000',//"#212121",
      "A100":'#000',//"#d5d5d5",
      "A200":'#000',//"#aaaaaa",
      "A400":'#000',//"#303030",
      "A700":'#000'//"#616161"
    },
    action: {
      active: '#000',
      hover: '#000',
      selected: '#000',
      disabled: '#000',
      disabledBackground: '#000',
    },
    primary: {
      main: '#000',
      light: '#000',
      dark: '#000',
      contrastText: '#000',
    },
    secondary: {
      main: '#000',
      light: '#000',
      dark: '#000',
      contrastText: '#000',
    },
    error: {
      main: '#000',
      light: '#000',
      dark: '#000',
      contrastText: '#000',
    },
    divider: '#000',
    tonalOffset: 0,//0.2,
    contrastThreshold: 0,//3,
    text: {
      primary: '#fff',
      secondary: '#000',
      disabled: '#000',
      hint: '#000',
      icon: '#000',
    },
  }, /**/
  overrides: {
    MuiAppBar: {
      colorDefault: {
        color: '#ff3f1f',
      }
    },
    MuiSvgIcon: {
      root: {
        fill: '#00ff1f',
      },
    }
  },
});