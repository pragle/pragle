import * as fs from 'fs';

const path = 'plugins/plugins.json';

export default class Constraint {
  static plugins = null;
  static load() {
    let json;
    if (fs.existsSync(path)) {
      const data = fs.readFileSync(path);
      json = JSON.parse(data);
    } else {
      json = {data:[]};
    }
    console.log('plugins', json);
    Constraint.plugins = json;
  }
}