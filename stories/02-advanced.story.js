import React from 'react';
import {storiesOf} from '@kadira/storybook';

import Collection from 'stories/advanced/Collection';
import Compose from 'stories/advanced/Compose';
import Connect from 'stories/advanced/Connect';
import Model from 'stories/advanced/Model';

storiesOf('Advanced', module)
  .add('Connect', () => <Connect />)
  .add('Model', () => <Model />)
  .add('Collection', () => <Collection />)
  .add('Compose', () => <Compose />);
