import * as alias from 'module-alias';
//import * as path from 'path';
import React from 'react';
import ReactDOM from 'react-dom';
//import * as uuid4 from 'uuid4';
// app
import Constraint from './constraint';
import { Main } from './view/main';

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
