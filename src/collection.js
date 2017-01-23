import React, {PropTypes} from 'react';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';

const propTypes = {
  className: PropTypes.string
};

const defaultProps = {
  className: ''
};

const isActive = (rule, props) => {
  if (isFunction(rule)) {
    return rule(props.formData, props);
  }
  return !!get(props.formData, rule);
};

const validateEntry = (component, props) => {
  if (Array.isArray(component)) {
    const [Entry, rule] = component;
    return isActive(rule, props) ? Entry : void 0;
  }
  return component;
};

const renderComponents = (components, props) => (
  components.map((component, key) => {
    const Entry = validateEntry(component, props);
    return Entry ? <Entry {...props} key={key} /> : null;
  })
);

const collection = (components = []) => {
  if (!Array.isArray(components)) {
    throw new Error('expect argument 1 of collection to be an array');
  }

  function FormCollection({className, ...props}) {
    const classes = `rfa-collection ${className}`;
    const rendered = renderComponents(components, props);

    return <div className={classes}>{rendered}</div>;
  }

  FormCollection.propTypes = propTypes;
  FormCollection.defaultProps = defaultProps;
  return FormCollection;
}

export default collection;
