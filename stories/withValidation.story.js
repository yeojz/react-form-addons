import React from 'react';
import {storiesOf, action} from '@kadira/storybook';

import withValidation from 'src/withValidation';
import Inputs from './components/Inputs';
import Story from './components/Story';

storiesOf('withValidation', module)
    .addDecorator(Story)
    .add('basic use', () => <div />)
