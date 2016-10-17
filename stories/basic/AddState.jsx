import React, {PropTypes} from 'react';
import withState from 'src/withState';
import createTwoFields from 'stories/common/createTwoFields';

const text = (
  <section>
    <h3>withState</h3>
    <p>
      Gives a stateless component form a state. All input are expected to
      call an <em>onChange</em> with an event parameter consisting of
      <em>target.name</em> and <em>target.value</em>
    </p>
    <p>All components are assumed controlled.</p>
  </section>
)
const AddState = createTwoFields(text);
export default withState()(AddState);
