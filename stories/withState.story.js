import React from 'react';
import {storiesOf, action} from '@kadira/storybook';

import withState from 'src/withState';
import Inputs from './components/Inputs';
import Pretty from './components/Pretty';
import Story from './components/Story';

const Component = (props) => (
    <div>
        <Inputs {...props} />
        <Pretty data={props.formData} />
    </div>
);

storiesOf('withState', module)
    .addDecorator(Story)
    .add('basic use', () => {
        const Wrapped = withState()(Component);
        return <Wrapped />;
    })
    .add('has default form data', () => {
        const defaultFormData = {
            first: 'test first',
            second: 'test second'
        }
        const Wrapped = withState(defaultFormData)(Component);
        return <Wrapped />;
    });
