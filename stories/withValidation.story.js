import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {Card} from 'material-ui/Card';

import {withState, withValidation} from 'src';
import Inputs from './components/Inputs';
import Pretty from './components/Pretty';
import Story from './components/Story';

const Component = (props) => (
  <Card>
    <Inputs {...props} />
    <h5>FormData</h5>
    <Pretty data={props.formData} />
    <h5>FormError</h5>
    <Pretty data={props.formError} />
  </Card>
);

const validator = (formData, props) => {
  const errors = {}
  if (formData.first !== 'test') {
    errors.first = 'first should equal "test"';
  }
  if (!formData.second) {
    errors.second = 'second should not be empty';
  }
  return errors;
}

storiesOf('withValidation', module)
  .addDecorator(Story)
  .add('basic usage', () => {
    const Wrapped = withValidation(validator)(
      withState()(Component)
    );
    return <Wrapped />;
  });