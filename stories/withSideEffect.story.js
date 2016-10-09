import React from 'react';
import {storiesOf, action} from '@kadira/storybook';

import withState from 'src/withState';
import withSideEffect from 'src/withSideEffect';;
import Inputs from './components/Inputs';
import Pretty from './components/Pretty';
import Story from './components/Story';

const Component = (props) => (
    <div>
        <Inputs {...props} />
        <Pretty data={props.formData} />
    </div>
);

const basicUse = (newData, name) => {
    if (name === 'first') {
        newData.second = newData.first;
    }
    if (name === 'second') {
        newData.first = newData.second;
    }
    return newData;
}

storiesOf('withSideEffect', module)
    .addDecorator(Story)
    .add('about', () => (
        <div className='p2'>
            <p>Side Effects refer to inter-dependent data that will change according to some other input.</p>
        </div>
    ))
    .add('basic use', () => {
        const Wrapped = withState()(
            withSideEffect(basicUse)(Component)
        );
        return <Wrapped />
    })
