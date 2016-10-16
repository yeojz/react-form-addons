import React from 'react';
import {storiesOf} from '@kadira/storybook';

storiesOf('Basic', module)
  .add('Add State', () => <div>test</div>)
  .add('Add Side Effects', () => <div />)
  .add('Add Validation', () => <div />);
