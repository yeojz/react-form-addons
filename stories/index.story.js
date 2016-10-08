import React from 'react';
import {storiesOf, linkTo} from '@kadira/storybook';
import Story from './components/Story';
import Welcome from './components/Welcome';

storiesOf('Welcome', module)
    .add('Readme', () => (
        <Welcome onClick={linkTo} />
    ));
