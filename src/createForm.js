import React, {PropTypes} from 'react';
import defaults from 'lodash/defaults';
import get from 'lodash/get';
import indexOf from 'lodash/indexOf';
import isFunction from 'lodash/isFunction';
import map from 'lodash/map';
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

export const reservedModelKeys = ['className', 'component', 'defaultValue', 'value'];

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

export const setValue = (obj, entry, props) => {
  const defaultValue = get(entry, 'defaultValue', '');
  const value = get(entry, 'value');

  const result = isFunction(value) ?
    value(props.formData, defaultValue) :
    get(props, ['formData', obj.name], defaultValue);

  if (isToggle(entry)) {
    obj.checked = value;
    return obj;
  }

  obj.value = value;
  return obj;
}

const mergeProps = (entry, props, options) => {
  let obj = initProps(entry, props);

  obj = addPrefix(obj, entry, options);
  obj = addStateAndHandlers(obj, entry, props, options);
  obj = setValue(obj, entry, props);
  obj = options.mutateProps(obj, props);

  return obj;
}

const fieldRenderer = (options, props) => (entry, idx) => {
  const Component = get(entry, 'component');
  const className = get(entry, 'className', '');
  const classes = `rfa-model-field ${className}`;
  const componentProps = mergeProps(entry, props, options);

  return (
    <div className={classes} key={componentProps.name || idx}>
        <Component {...componentProps} />
    </div>
  );
}

const getFormProps = (options, props) => {
  let obj = {}
  if (options.type === 'form') {
    obj.onSubmit = props.onSubmit;
  }
  return obj;
}

export const createForm = (model = [], opt = {}) => {
  const options = defaults({}, opt, {
    className: '',
    mutateProps: (obj) => obj,
    prefix: '',
    toggleTypes: ['checkbox'],
    type: 'div'
  });

  const Form = get(options, 'type');

  function CreatedForm(props) {
    const classes = `rfa-form ${options.className} ${props.className}`;
    const fields = map(model, fieldRenderer(options, props));
    const formProps = getFormProps(options, props);

    return (
      <Form
        {...formProps}
        className={classes}>
        {fields}
      </Form>
    );
  }

  CreatedForm.propTypes = propTypes;
  CreatedForm.defaultProps = defaultProps;
  return CreatedForm;
}

export default createForm;
