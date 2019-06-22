import * as fs from 'fs';
import React from 'react'
import { Link } from 'react-router-dom'
import Constraint from '../constraint'
import Button from '@material-ui/core/Button';

export const ConnectMenuView = () => {
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

export const ConnectDetailsView = ({location}) => {
  const componentWillMount = () => {
    console.log(__dirname, __filename);
    console.log(location);
    const dbname = location.state ? location.state.name : '';
    const path = `plugins/data/${dbname}/connect.json`;
    const dir = fs.readdirSync("plugins");
    //console.log(dir);
    if(fs.existsSync(path)) {
      const data = fs.readFileSync(path);
      return JSON.parse(data);
    }
    return {title:`Database plugin : '${dbname}' not found`, options:[]};
  }
  const [data, setData] = React.useState(componentWillMount());

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
  if(data.options.length > 0) {
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