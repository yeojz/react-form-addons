import React, {PropTypes} from 'react';
import collection from 'src/collection';
import connect from 'src/connect';
import compose from 'src/compose';
import withState from 'src/withState';

import Input, {renderInput} from 'stories/common/Input';
import Print from 'stories/common/Print';

const propTypes = {
  formData: PropTypes.object
}

const InputGroupOne = (props) => (
  <div className='input-group'>
    {renderInput('fieldOne', props)}
    {renderInput('fieldTwo', props)}
  </div>
);

const InputGroupTwo = (props) => (
  <div className='input-group'>
    {renderInput('fieldThree', props)}
    {renderInput('fieldFour', props)}
  </div>
);

const InputGroupThree = (props) => (
  <div className='input-group'>
    {renderInput('fieldFive', props)}
    {renderInput('fieldSix', props)}
  </div>
);

const InputGroupCollection = compose(
  collection('grouped'),
  withState(),
  connect,
)([InputGroupOne, InputGroupTwo])

const Collection = (props) => {
  return (
    <div className='advanced-collection'>
      <div className='box inverse'>
        <h3>collection</h3>
        <p>
          Allows the grouping of data sets into a virtual input.
        </p>
      </div>

      <div className='box'>
        <h3>Form</h3>
        <div className='box'>
          <h3>Grouped</h3>
          <InputGroupCollection {...props} />
        </div>

        <InputGroupThree {...props} />
      </div>

      <Print
        className='box inverse'
        header='formData'
        data={props.formData} />
    </div>
  )
}

Collection.propTypes = propTypes;
export default withState()(Collection);
