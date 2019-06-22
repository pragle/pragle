import * as alias from 'module-alias';
import * as fs from 'fs';
//import * as path from 'path';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
//import * as uuid4 from 'uuid4';
// app
import Constraint from './constraint';
import {PluginsView} from './view/plugins';
import {ConnectMenuView, ConnectDetailsView} from './view/sql';

const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex',
  },
}));

const Main = () => {
  const styles = useStyles();
  return (
    <div className={styles.main}>
      <CssBaseline />
      <div>
        <a href="/">New Connection</a>
        <a href="/#/plugins">Plugins</a>
      </div>
      <div>
        <Router>
          <Route path="/" exact component={ConnectMenuView} />
          <Route path="/connect" component={ConnectDetailsView} />
          <Route path="/plugins" component={PluginsView} />
        </Router>
      </div>
    </div>
  );
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
