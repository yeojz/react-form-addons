import React from 'react';
import {storiesOf} from '@kadira/storybook';

import {withState, withSideEffect} from 'src';
import Inputs from './components/Inputs';
import Pretty from './components/Pretty';
import Story from './components/Story';
import {Card} from 'material-ui/Card';

const Component = (props) => (
  <Card>
    <Inputs {...props} />
    <Pretty data={props.formData} />
  </Card>
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
  .add('basic usage', () => {
    const Wrapped = withState()(
      withSideEffect(basicUse)(Component)
    );
    return <Wrapped />;
  });
