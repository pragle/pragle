import * as alias from 'module-alias';
//import * as path from 'path';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
//import * as uuid4 from 'uuid4';
// app
import Constraint from './constraint';
import {customTheme} from './customTheme';
import {PluginsView} from './view/plugins';
import {ConnectMenuView, ConnectDetailsView} from './view/sql';

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

const Main = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    console.log('open drawer');
    setOpen(true);
  }

  const handleDrawerClose = () => {
    console.log('close drawer');
    setOpen(false);
  }
  return (
    <MuiThemeProvider theme={customTheme}>
      <div className={classes.main}>
        <CssBaseline />
        <AppBar position="fixed" color="default"
                className={clsx(classes.appBar, {
                  [classes.appBarShift]: open,
                })}>
          <Toolbar>
            <IconButton edge="start" color="inherit"
                        aria-label="Menu"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.hide)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>PRAGLE</Typography>
          </Toolbar>
        </AppBar>
        <Drawer className={classes.drawer}
                variant="persistent" anchor="left"
                open={open}
                classes={{paper: classes.drawerPaper,}}>
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon  />
            </IconButton>
          </div>
          <Divider />
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Container className={clsx(classes.content, {[classes.contentShift]: open,})}>
          <div className={classes.drawerHeader} />
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
            facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
            gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
            donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
            adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
            Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
            imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
            arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </Typography>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
            facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
            tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
            consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
            vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
            hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
            tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
            nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
            accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
          </Typography>
        </Container>
      </div>
    </MuiThemeProvider>
  );
  /*
  return (
    <div className={classes.main}>
      <CssBaseline />
      <AppBar position="fixed" color="default"
              className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
              })}>
        <Toolbar>
          <IconButton edge="start" color="inherit"
                      aria-label="Menu"
                      onClick={handleDrawerOpen}
                      className={clsx(classes.menuButton, open && classes.hide)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>PRAGLE</Typography>
        </Toolbar>
      </AppBar>

      {<div>
        <a href="/">New Connection</a>
        <a href="/#/plugins">Plugins</a>
      </div>
      <div>
        <Router>
          <Route path="/" exact component={ConnectMenuView} />
          <Route path="/connect" component={ConnectDetailsView} />
          <Route path="/plugins" component={PluginsView} />
        </Router>
      </div>}
    </div>
  );   */
}
// load constraints
Constraint.load();
// make aliases
alias();
const createElement = (name, props) => {
  const el = document.createElement(name);
  props.forEach((p) => el[p[0]] = p[1])
  return el;
}
const installMaterialUI = () => {
  const font = createElement('link', [
    ['rel', 'stylesheet'],
    ['href', 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'],
  ]);
  const icons = createElement('link', [
    ['rel', 'stylesheet'],
    ['href', 'https://fonts.googleapis.com/icon?family=Material+Icons'],
  ]);
  const viewport = createElement('meta', [
    ['name', 'viewport'],
    ['content', 'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no']
  ]);
  document.head.appendChild(viewport);
  document.head.appendChild(font);
  document.head.appendChild(icons);
}
installMaterialUI();

ReactDOM.render(<Main />, document.getElementById('app'));
