import React, {PropTypes} from 'react';
import {linkTo} from '@kadira/storybook-addon-links';
import map from 'lodash/map';
import startCase from 'lodash/startCase';
import config from 'stories/config.sidebar';
import pkg from 'package';

const renderLinks = () => {
  return map(config, (group, title) => {
    const list = map(group, (link, text) => (
      <span className='navlink' onClick={linkTo(...link)} key={text}>{text}</span>
    ));

    return (
      <div className='group' key={title}>
        <h2>{title}</h2>
        {list}
      </div>
    )
  })
}

const Sidebar = (props) => {
  return (
    <aside className='sidebar'>
      <h1>{startCase(pkg.name)}</h1>
      <p>{pkg.description}</p>
      {renderLinks()}
    </aside>
  )
}

export default Sidebar
