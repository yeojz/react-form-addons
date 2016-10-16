import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {Card} from 'material-ui/Card';

import {withState} from 'src';
import Inputs from './components/Inputs';
import Pretty from './components/Pretty';
import Story from './components/Story';

const Component = (props) => (
  <Card>
    <Inputs {...props} />
    <Pretty data={props.formData} />
  </Card>
);

storiesOf('createForm', module)
  .addDecorator(Story)
  .add('combine 2 components', () => {
    const Wrapped = withState()(Component);
    return <Wrapped />;
  });
