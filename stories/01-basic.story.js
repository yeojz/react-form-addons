import React from 'react';
import {storiesOf} from '@kadira/storybook';

import AddSideEffect from './basic/AddSideEffect';
import AddState from './basic/AddState';
import AddValidation from './basic/AddValidation';

storiesOf('Basic', module)
  .add('Add State', () => <AddState />)
  .add('Add Side Effects', () => <AddSideEffect />)
  .add('Add Validation', () => <AddValidation />);
