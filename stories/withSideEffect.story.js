import React from 'react';
import {storiesOf, action} from '@kadira/storybook';

import withSideEffect from '../src/withSideEffect';
import Inputs from './components/Inputs';
import Story from './components/Story';

storiesOf('withSideEffect', module)
    .addDecorator(Story)
    .add('basic use', () => <div />)
