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
