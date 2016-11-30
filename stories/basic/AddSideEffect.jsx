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

const text = (
  <section>
    <h3>withSideEffect</h3>
    <p>Side effects are data changes that will trigger or cause an update to other data.</p>
    <p>In this example, both fields will update simultaneously upon input</p>
  </section>
)
const AddSideEffect = createTwoFields(text);
const SideEffect = withSideEffect(copyEffect)(AddSideEffect);
export default withState()(SideEffect);
