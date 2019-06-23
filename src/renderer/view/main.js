import { ConnectDetailsView, ConnectMenuView } from './sql';
import { PluginsView } from './plugins';
import { customTheme } from '../customTheme';
import React from 'react';
import useGlobalHook from 'use-global-hook';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronRightIcon from '@material-ui/icons/ChevronLeft';

import { HashRouter, Route } from 'react-router-dom';


const drawerWidth = 180;

const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex',
    minHeight: '100vh',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    height: '65px',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const mainState = {
  open: false,
}

const mainStateActions = {
  changeOpen: (store, value) => {
    store.setState({open: value});
  }
}

const mainStateGlobal = useGlobalHook(React, mainState, mainStateActions);

const MainTop = ({state, actions}) => {
  const classes = useStyles();

  const handleDrawerOpen = () => {
    actions.changeOpen(true);
  }

  return (
    <AppBar position="fixed" color="default"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: state.open,
            })}>
      <Toolbar>
        <IconButton edge="start" color="inherit"
                    aria-label="Menu"
                    onClick={handleDrawerOpen}
                    className={clsx(classes.menuButton, state.open && classes.hide)}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>PRAGLE</Typography>
      </Toolbar>
    </AppBar>
  );
}

const MainDrawer = ({state, actions}) => {
  const classes = useStyles();

  const handleDrawerClose = () => {
    actions.changeOpen(false);
  }

  return (
    <Drawer className={classes.drawer}
            variant="persistent" anchor="left"
            open={state.open}
            classes={{paper: classes.drawerPaper,}}>
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronRightIcon  />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button component="a" href="/#">
          <ListItemText primary={'Connect'}></ListItemText>
        </ListItem>
        <ListItem button component="a" href="/#/plugins">
          <ListItemText primary={'Plugins'} />
        </ListItem>
      </List>
    </Drawer>
  );
}

const MainContent = ({state, actions}) => {
  const classes = useStyles();
  return (
    <Container className={clsx(classes.content, {[classes.contentShift]: state.open,})}>
      <div className={classes.drawerHeader} />
      <HashRouter>
        <Route path="/" exact component={ConnectMenuView} />
        <Route path="/connect" component={ConnectDetailsView} />
        <Route path="/plugins" component={PluginsView} />
      </HashRouter>
    </Container>
  );
}

export const Main = () => {
  const classes = useStyles();
  const [state, actions] = mainStateGlobal();
  return (
    <MuiThemeProvider theme={customTheme}>
      <div className={classes.main}>
        <CssBaseline />
        <MainTop state={state} actions={actions} />
        <MainDrawer state={state} actions={actions} />
        <MainContent state={state} actions={actions} />
      </div>
    </MuiThemeProvider>
  );
}
