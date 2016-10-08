import React from 'react';
import {storiesOf, action} from '@kadira/storybook';

import withState from '../src/withState';
import Inputs from './components/Inputs';
import Story from './components/Story';

storiesOf('withState', module)
    .addDecorator(Story)
    .add('basic use', () => {
        const StatefulInputs = withState()(Inputs);
        return <StatefulInputs />;
    })
    .add('has default form data', () => {
        const defaultFormData = {
            first: 'test first',
            second: 'test second'
        }
        const StatefulInputs = withState(defaultFormData)(Inputs);
        return <StatefulInputs />;
    });
