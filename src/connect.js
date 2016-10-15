import React, {PropTypes} from 'react';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import map from 'lodash/map';

const propTypes = {
  classNames: PropTypes.string
}

const defaultProps = {
  classNames: ''
}

const isComponentActive = (validationKey, formData, props = {}) => {
  if (isFunction(validationKey)) {
    return validationKey(formData, props);
  }
  return get(formData, validationKey);
}

const processEntry = (entry, props) => {
  const validationKey = get(entry, 1);
  const formData = get(props, 'formData');
  if (isComponentActive(validationKey, formData, props)) {
    return get(entry, 0);
  }
  return void 0;
}

const parseToComponent = (entry, props) => {
  if (Array.isArray(entry)) {
    return processEntry(entry, props);
  }
  return entry;
}

const initComponents = (components) => (props) => {
  return map(components, (entry, key) => {
    const Component = parseToComponent(entry, props);
    return Component ? <Component {...props} key={key} /> : null;
  });
}

export const connect = (components = []) => {
  const getComponents = initComponents(components);

  function ConnectedForm(props) {
    const classes = `rfa-connect ${props.className}`;
    const mapped = getComponents(props);
    return <div className={classes}>{mapped}</div>;
  }

  ConnectedForm.propTypes = propTypes;
  ConnectedForm.defaultProps = defaultProps;
  return Formset;
}

export default connect;
