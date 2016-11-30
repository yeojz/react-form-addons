import React, {PropTypes} from 'react';
import get from 'lodash/get';
import indexOf from 'lodash/indexOf';
import isFunction from 'lodash/isFunction';
import noop from 'lodash/noop';
import omit from 'lodash/omit';

export const propTypes = {
  classNames: PropTypes.string,
  disabled: PropTypes.bool,
  formData: PropTypes.object,
  formDisabled: PropTypes.object,
  onChange: PropTypes.func,
  onToggle: PropTypes.func,
  onSubmit: PropTypes.func
}

export const defaultProps = {
  classNames: '',
  formData: {},
  formDisabled: {},
  onChange: noop,
  onToggle: noop,
  onSubmit: noop
}

const propKeys = Object.keys(propTypes);

export const reservedModelKeys = [
  'className',
  'component',
  'defaultValue',
  'mutateProps',
  'value'
];

export const isToggle = (entry, options) => {
  return indexOf(options.toggleTypes, entry.type) > -1;
}

export const initProps = (entry, props) => ({
  ...omit(entry, reservedModelKeys),
  ...omit(props, propKeys),
  disabled: props.disabled
});

export const addPrefix = (obj, entry, options) => {
  obj.name = `${options.prefix}${entry.name}`;
  return obj;
}

export const addStateAndHandlers = (obj, entry, props, options) => {
  const disabled = get(props, ['formDisabled', entry.name], props.disabled);

  obj.disabled = disabled;
  obj.onChange = isToggle(entry, options) ? props.onToggle : props.onChange;

  return obj;
}

export const setValue = (obj, entry, props, options) => {
  const defaultValue = get(entry, 'defaultValue', '');
  const value = get(entry, 'value');

  const result = isFunction(value) ?
    value(props.formData, defaultValue) :
    get(props, ['formData', obj.name], defaultValue);

  if (isToggle(entry, options)) {
    obj.checked = value;
    return obj;
  }

  obj.value = value;
  return obj;
}

const applyCustomMutation = (obj, props) => {
  if (isFunction(props.mutateProps)) {
    return props.mutateProps(obj, props);
  }
  return obj;
}

const mergeProps = (entry, props, options) => {
  let obj = initProps(entry, props);

  obj = addPrefix(obj, entry, options);
  obj = addStateAndHandlers(obj, entry, props, options);
  obj = setValue(obj, entry, props, options);
  obj = options.mutateProps(obj, props);
  obj = applyCustomMutation(obj, props);

  return obj;
}

export const createField = (field, options) => {
  const Component = get(field, 'component');
  const className = get(field, 'className', '');
  const classes = `rfa-model-field ${className}`;

  function Field(props) {
    const componentProps = mergeProps(field, props, options);

    return (
      <div className={classes}>
          <Component {...componentProps} />
      </div>
    );
  }

  Field.propTypes = propTypes;
  Field.defaultProps = defaultProps;
  return Field;
}

export default createField;
