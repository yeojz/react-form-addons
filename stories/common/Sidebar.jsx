import React, {PropTypes} from 'react';
import get from 'lodash/get';
import map from 'lodash/map';
import startCase from 'lodash/startCase';
import config from 'stories/config.sidebar';
import pkg from 'package';
import queryString from 'query-string';
import Link from './Link'

export const getActiveStory = (search) => {
  const {selectedStory} = queryString.parse(search);
  return selectedStory;
}

const handleActiveChange = (value) => {
  window._storyActiveLink = value;
}

const renderLink = (link, text) => (
  <Link
    active={window._storyActiveLink}
    link={link}
    key={text}
    text={text}
    onActiveChange={handleActiveChange} />
)

const renderLinks = () => {
  return map(config, (group, title) => {
    const list = map(group, renderLink);

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
      </aside>
    )
  }
}

export default Sidebar;
