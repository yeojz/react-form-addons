import React from 'react';
import {storiesOf, action} from '@kadira/storybook';

import withState from 'src/withState';
import withSideEffect from 'src/withSideEffect';

import SideEffect from './components/SideEffect';
import Inputs from './components/Inputs';
import Story from './components/Story';

const updateState = action('formData')

storiesOf('withSideEffect', module)
    .addDecorator(Story)
    .add('basic use', () => {
        const fn = (newData, name) => {
            if (name === 'first') {
                newData.second = newData[name];
            }
            return newData;
        }
        const Component = SideEffect(fn);
        return <Component print />
    })
