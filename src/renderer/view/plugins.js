import Constraint from '../constraint'
import React from 'react'


export const PluginsView = () => {
  const [plugins, setPlugins] = React.useState(Constraint.plugins.data);
  return (
    <div>
      <h1>Plugins</h1>
      <div>
        {plugins.map((el, i) => <PluginCard  key={`plugin-${i}`} data={el} /> )}
      </div>
    </div>
  );
}

const PluginCard = ({data}) => {
  const fields = [
    {key:'name', title:'Name :'},
    {key:'description', title:'Description :'},
    {key:'author', title:'Author :'},
    {key:'version', title:'Version :'}
  ];
  return (
    <div>
      <h3>{data.pragle.title}</h3>
      {fields.map((el, i) => <PluginCardItem key={`plugin-card-${i}`} title={el.title} description={data[el.key]}/>)}
    </div>
  );
}

const PluginCardItem = ({title, description}) => {
  return (
    <div>
      <label>{title}</label>
      <span>{description}</span>
    </div>
  );
}
