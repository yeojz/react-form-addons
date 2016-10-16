import React, {PropTypes} from 'react';
import omit from 'lodash/omit';

const propTypes = {
  label: PropTypes.any,
  error: PropTypes.any
}

const propKeys = Object.keys(propTypes);

const renderText = (text, classes) => {
  if (text) {
    return <span className={classes}>{text}</span>
  }
}

const Input = (props) => {
  const inputProps = omit(props, propKeys);

  return (
    <div className='stories-input'>
      {renderText(props.label, 'stories-input-label')}
      <div className='stories-input-field'>
        <input {...inputProps} />
      </div>
      {renderText(props.error, 'stories-input-error')}
    </div>
  )
}

Input.propTypes = propTypes;
export default Input;
