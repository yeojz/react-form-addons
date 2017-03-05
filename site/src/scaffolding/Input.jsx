import React, {PropTypes} from 'react';
import classnames from 'classnames';

const propTypes = {
  disabled: PropTypes.bool,
  getFormData: PropTypes.func,
  getFormError: PropTypes.func,
  isHorizontal: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onToggle: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string
};

const defaultProps = {
  isHorizontal: true,
  type: 'text'
};

const getFormErrors = (props) => {
  if (!props.getFormError) {
    return null;
  }

  const error = props.getFormError(props.name);
  return error || null;
};

const Input = (props) => {
  const errors = getFormErrors(props);
  const inputClass = classnames({
    input: props.type === 'text',
    checkbox: props.type === 'checkbox',
     'is-small': true,
    'is-danger': !!errors
  });

  const controlClass = classnames({
    control: true,
    'is-horizontal': props.isHorizontal
  });

  return (
    <div className='inputset'>
      <div className={controlClass}>
        <div className="control-label">
          <label className='label is-small'>{props.label || props.name}</label>
        </div>
        <div className='control'>
          <input
            className={inputClass}
            disabled={props.disabled}
            name={props.name}
            onChange={props.type === 'checkbox' ? props.onToggle : props.onChange}
            placeholder={props.placeholder}
            type={props.type}
            value={props.getFormData(props.name)}
          />
        </div>
      </div>
      {errors
        ? <div className='help is-danger'>{errors}</div>
        : null
      }
    </div>
  );
};

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;
export default Input;
