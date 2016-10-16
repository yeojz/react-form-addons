import React, {PropTypes} from 'react';
import {linkTo} from '@kadira/storybook-addon-links';
import get from 'lodash/get';

const propTypes = {
  active: PropTypes.string,
  link: PropTypes.array,
  onActiveChange: PropTypes.func,
  text: PropTypes.string
}

const getLinkClass = (active, link) => {
  const current = get(link, link.length - 1);
  if (active === current) {
    return 'navlink active';
  }
  return 'navlink';
}

const navigate = (onActiveChange, link) => () => {
  const current = get(link, link.length - 1);
  onActiveChange(current);
  linkTo(...link)();
}

const Link = (props) => {
  const {active, link, onActiveChange, text} = props;

  return (
    <span
      className={getLinkClass(active, link)}
      onClick={navigate(onActiveChange, link)}>
      {text}
    </span>
  )
}

Link.propTypes = propTypes;
export default Link;
