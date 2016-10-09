import React from 'react';
import {storiesOf, action} from '@kadira/storybook';

import withState from 'src/withState';
import withValidation from 'src/withValidation';
import Inputs from './components/Inputs';
import Pretty from './components/Pretty';
import Story from './components/Story';

const Component = (props) => (
    <div>
        <Inputs {...props} />
        <h5>FormData</h5>
        <Pretty data={props.formData} />
        <h5>FormError</h5>
        <Pretty data={props.formError} />
    </div>
);

const validator = (formData, props) => {
    const errors = {}
    if (formData.first !== 'test') {
        errors.first = 'first should equal "test"'
    }
    if (!formData.second) {
        errors.second = 'second should not be empty'
    }
    return errors;
}

storiesOf('withValidation', module)
    .addDecorator(Story)
    .add('basic use', () => {
        const Wrapped = withValidation(validator)(
            withState()(Component)
        );
        return <Wrapped />
    })
