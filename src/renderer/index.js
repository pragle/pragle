import * as alias from 'module-alias';
import * as fs from 'fs';
//import * as path from 'path';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
//import * as uuid4 from 'uuid4';
// app
import Constraint from './constraint';
import {PluginsView} from './view/plugins';

const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex',
  },
}));

const ConnectMenuView = () => {
  const [selectedValue, setSelectedValue] = React.useState('@pragle/mysql-plugin');
  const databases = Constraint.plugins.registry.db;
  return (
    <div>
      <div>
        <select onChange={(e) => setSelectedValue(e.target.value)}
                value={selectedValue}>
          {databases.map((el, i) => <option key={`${el.value}_${i}`} value={el.value}>{el.title}</option>)}
        </select>
        <Button variant="contained"
                color="primary"
                to={{pathname:'/connect', state: {name:selectedValue}}}
                component={Link}>
          Connect</Button>
      </div>
    </div>
  );
}

const ConnectDetailsView = ({location}) => {
  const componentWillMount = () => {
    console.log(__dirname, __filename);
    console.log(location);
    const dbname = location.state ? location.state.name : '';
    const path = `plugins/data/${dbname}/connect.json`;
    const dir = fs.readdirSync("plugins");
    //console.log(dir);
    if(fs.existsSync(path)) {
      const data = fs.readFileSync(path);
      return JSON.parse(data)
    }
    return {title:`Database plugin : '${dbname}' not found`, options:[]};
  }
  const {options, title} = componentWillMount();
  const [data, setData] = React.useState({options, title});

  const handleSaveClick = () => {};
  const handleConnectClick = () => {
    const options = {};
    data.options.forEach((el) => {
      if('opt_name' in el) {
        let val = el.value;
        if(el.dataType == 'integer') {
          val = parseInt(val);
        }
        options[el.opt_name] = val;
      }
    });
    const plugin = global.require(`@plugins/${location.state.name}`);
    console.log(plugin);
    const conn = new plugin.SQLConnector(options);
    conn.connect();
    console.log(conn);
    const tables = conn.getTables();
    console.log(tables);
  };
  let buttonMenu;
  if(options.length > 0) {
    buttonMenu = (
      <div>
        <Button onClick={handleSaveClick}>Save</Button>
        <Button onClick={handleConnectClick}>Connect</Button>
      </div>);
  }

  return (
    <div>
      <form>
        <div>
          <label>{data.title}</label>
        </div>
        {data.options.map((el, i) => {
          return (
            <div key={`connect_detail_options_${i}`}>
              <label>{el.label}</label>
              <input placeholder={el.placeholder}
                     type={el.type}
                     value={el.value}
                     onChange={(e) => {
                       el.value = e.target.value;
                       setData({title: data.title, options: data.options});
                     }}
              />
            </div>
          );
        })}
        {buttonMenu}
      </form>
    </div>
  );
}

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
