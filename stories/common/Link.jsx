import React, {PropTypes} from 'react';
import {linkTo} from '@kadira/storybook-addon-links';
import get from 'lodash/get';

const propTypes = {
  active: PropTypes.object,
  group: PropTypes.string,
  link: PropTypes.string,
  onActiveChange: PropTypes.func
}

const getLinkClass = (active, link) => {
  if (active === link) {
    return 'navlink active';
  }
  return 'navlink';
}

const Link = (props) => {
  const {active, group, link, onActiveChange} = props;

  return (
    <span
      className={getLinkClass(active.story, link)}
      onClick={linkTo(group, link)}>
      {link}
    </span>
  )
}

Link.propTypes = propTypes;
export default Link;
