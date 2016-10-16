import React, {PropTypes} from 'react';
import withState from 'src/withState';
import createTwoFields from 'stories/common/createTwoFields';

const text = (
  <section>
    <p>Gives a stateless component form a state</p>
    <p>All input are expected to call an <em>onChange</em> with an event parameter
    consisting of <em>target.name</em> and <em>target.value</em></p>
    <p>All components are assumed controlled.</p>
  </section>
)
const AddState = createTwoFields(text);
export default withState()(AddState);
