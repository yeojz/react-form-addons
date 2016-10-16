import React from 'react';
import {storiesOf} from '@kadira/storybook';

import AddState from './basic/AddState';

storiesOf('Basic', module)
  .add('Add State', () => <AddState />)
  .add('Add Side Effects', () => <div />)
  .add('Add Validation', () => <div />);
