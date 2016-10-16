import React, {PropTypes} from 'react';
import withState from 'src/withState';

import Input from 'stories/common/Input';
import Print from 'stories/common/Print';

const propTypes = {
  formData: PropTypes.object,
  onChange: PropTypes.func
}

const AddState = (props) => {
  return (
    <div className='basic-add-state'>

      <div className='input-area box'>
        <h3>Inputs</h3>

        <Input
          label='fieldOne'
          name='fieldOne'
          onChange={props.onChange}
          value={props.formData.fieldOne || ''} />

        <Input
          label='fieldTwo'
          name='fieldTwo'
          onChange={props.onChange}
          value={props.formData.fieldTwo || ''} />
      </div>

      <Print
        className='box'
        header='formData'
        data={props.formData} />
    </div>
  )
}

AddState.propTypes = propTypes;
export default withState()(AddState);
