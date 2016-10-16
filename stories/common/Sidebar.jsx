import React, {PropTypes} from 'react';
import get from 'lodash/get';
import map from 'lodash/map';
import startCase from 'lodash/startCase';
import queryString from 'query-string';
import pkg from 'package';

import config from 'stories/config.sidebar';
import Link from 'stories/common/Link';
import ProjectLinks from 'stories/common/ProjectLinks';

export const getActiveStory = (search) => {
  const {selectedStory} = queryString.parse(search);
  return selectedStory;
}

const handleActiveChange = (value) => {
  window._storyActiveLink = value;
}

const renderLink = (group) => (link) => (
  <Link
    active={window._storyActiveLink}
    link={link}
    group={group}
    key={link}
    onActiveChange={handleActiveChange} />
)

const renderLinks = () => {
  return map(config, (group, title) => {
    const list = map(group, renderLink(group));

    return (
      <div className='group' key={title}>
        <h2>{title}</h2>
        {list}
      </div>
    );
  });
}

class Sidebar extends React.Component {
  componentWillMount = () => {
    const search = get(window, 'location.search', '');
    window._storyActiveLink = window._storyActiveLink || getActiveStory(search);
  }

  render() {
    return (
      <aside className='sidebar'>
        <h1>{startCase(pkg.name)}</h1>
        <p>{pkg.description}</p>
        {renderLinks()}
        <ProjectLinks />
      </aside>
    )
  }
}

export default Sidebar;
