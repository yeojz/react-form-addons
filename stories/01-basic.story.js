import React from 'react';
import {storiesOf} from '@kadira/storybook';

import AddSideEffect from 'stories/basic/AddSideEffect';
import AddState from 'stories/basic/AddState';
import AddValidation from 'stories/basic/AddValidation';

storiesOf('Basic', module)
  .add('Add State', () => <AddState />)
  .add('Add Side Effects', () => <AddSideEffect />)
  .add('Add Validation', () => <AddValidation />);
