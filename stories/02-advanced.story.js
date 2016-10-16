import React from 'react';
import {storiesOf} from '@kadira/storybook';

import Connect from 'stories/advanced/Connect';

storiesOf('Advanced', module)
  .add('Connect', () => <Connect />)
  .add('Models', () => <div />)
  .add('Collections', () => <div />)
  .add('Compose', () => <div />);
