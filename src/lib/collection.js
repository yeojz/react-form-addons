// @flow
import React from 'react';
import invariant from 'invariant';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';

type Props = {
  className: string,
  formData: Object
}

const isActive = (rule: any, props: Object): boolean => {
  if (isFunction(rule)) {
    return rule(props.formData, props);
  }
  return !!get(props.formData, rule);
};

const validateEntry = (component: WrappedComponent | Array<*>, props: Object) => {
  if (Array.isArray(component)) {
    const [Entry, rule] = component;
    return isActive(rule, props) ? Entry : void 0;
  }
  return component;
};

const renderComponents = (components: Array<WrappedComponent | Array<*>>, props: Object): Array<React$Element<*> | null> => (
  components.map((component, key) => {
    const Entry = validateEntry(component, props);
    return Entry ? <Entry {...props} key={key} /> : null;
  })
);

const collection = (components: Array<WrappedComponent | Array<*>> = []) => {

  invariant(
    Array.isArray(components),
    `
    Missing or invalid argument 1 for "collection".
    Expects an argument 1 of type "array". "${typeof components}" given.
    `
  );

  class FormCollection extends React.Component {
    props: Props

    static defaultProps = {
      className: ''
    }

    render() {
      const {className, ...props} = this.props;
      const classes = `rfa-collection ${className}`;
      const rendered = renderComponents(components, props);

      return <div className={classes}>{rendered}</div>;
    }
  }

  return FormCollection;
}

export default collection;
