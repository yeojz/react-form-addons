import React, {PropTypes} from 'react';
import withState from 'src/withState';
import createTwoFields from 'stories/common/createTwoFields';

const text = 'All components are controlled. As such, all values will be saved to state';
const AddState = createTwoFields(text);
export default withState()(AddState);
