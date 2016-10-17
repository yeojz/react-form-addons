import React, {PropTypes} from 'react';
import get from 'lodash/get';
import map from 'lodash/map';
import startCase from 'lodash/startCase';
import queryString from 'query-string';
import pkg from 'package';

import config from 'stories/config.sidebar';
import Link from 'stories/common/Link';
import ProjectLinks from 'stories/common/ProjectLinks';

const propTypes = {
  active: PropTypes.object
}

const renderLink = (active, groupName) => (link) => (
  <Link
    active={active}
    link={link}
    group={groupName}
    key={link} />
)

const renderLinks = (active) => {
  return map(config, (group, groupName) => {
    const list = map(group, renderLink(active, groupName));

    return (
      <div className='group' key={groupName}>
        <h2>{groupName}</h2>
        {list}
      </div>
    );
  });
}

const Sidebar = (props) => (
  <aside className='sidebar'>
    <h1>{startCase(pkg.name)}</h1>
    <p>{pkg.description}</p>
    {renderLinks(props.active)}
    <ProjectLinks />

    <span className='credits'>
      Built using React Storybook,
      with custom navigation by gerald.
    </span>
  </aside>
)

Sidebar.propTypes = propTypes;
export default Sidebar
