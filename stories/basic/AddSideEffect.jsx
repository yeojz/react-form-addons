import React, {PropTypes} from 'react';
import withState from 'src/withState';
import withSideEffect from 'src/withSideEffect';
import createTwoFields from 'stories/common/createTwoFields';

const copyEffect = (newData, name) => {
  if (name === 'fieldOne') {
    newData.fieldTwo = newData.fieldOne;
  }
  if (name === 'fieldTwo') {
    newData.fieldOne = newData.fieldTwo;
  }
  return newData;
}

const text = 'Both fields will be updated upon typing in either one';
const AddSideEffect = createTwoFields(text);
const SideEffect = withSideEffect(copyEffect)(AddSideEffect);
export default withState()(SideEffect);
