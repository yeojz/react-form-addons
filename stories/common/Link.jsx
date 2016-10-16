import React, {PropTypes} from 'react';
import {linkTo} from '@kadira/storybook-addon-links';
import get from 'lodash/get';

const propTypes = {
  active: PropTypes.string,
  group: PropTypes.string,
  link: PropTypes.array,
  onActiveChange: PropTypes.func
}

const getLinkClass = (active, link) => {
  if (active === link) {
    return 'navlink active';
  }
  return 'navlink';
}

const navigate = (onActiveChange, group, link) => () => {
  onActiveChange(link);
  linkTo(group, link)();
}

const Link = (props) => {
  const {active, group, link, onActiveChange} = props;

  return (
    <span
      className={getLinkClass(active, link)}
      onClick={navigate(onActiveChange, group, link)}>
      {link}
    </span>
  )
}

Link.propTypes = propTypes;
export default Link;
