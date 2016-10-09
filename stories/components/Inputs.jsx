import React, {PropTypes} from 'react';
import TextField from 'material-ui/TextField';

const propTypes = {
  formData: PropTypes.object,
  formError: PropTypes.object,
  onChange: PropTypes.func,
  print: PropTypes.bool 
}

const defaultProps = {
  formData: {},
  formError: {}
}

const style = {
  boxSizing: 'border-box',
  width: '90%'
}

const Inputs = (props) => {
  return (
    <div className='story-inputs'>
      <TextField
        className='input'
        errorText={props.formError.first || ''}
        floatingLabelText='First'
        name='first'
        onChange={props.onChange}
        style={style}
        value={props.formData.first || ''} />
      <br />
      <TextField
        className='input'
        errorText={props.formError.second || ''}
        floatingLabelText='Second'
        name='second'
        onChange={props.onChange}
        style={style}
        value={props.formData.second || ''} />
    </div>
  )
}

Inputs.propTypes = propTypes;
Inputs.defaultProps = defaultProps;
export default Inputs;
