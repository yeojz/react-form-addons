// @flow
import React from 'react';
import invariant from 'invariant';
import createSyntheticFormEvent from '../utils/createSyntheticFormEvent';
import constants from './constants';

type Props = {
  onChange: Function,
  onError: Function
};

type SideEffects = Array<Function>;

const applySideEffects = (sideEffects: SideEffects, evt: SyntheticFormEvent, props: Props): any => (
  sideEffects.reduce(
    (p, fn) => p.then((event) => fn(event, props)),
    Promise.resolve(evt)
  )
);

const handleChange = (sideEffects: SideEffects) => (props: Props) => (evt: DefaultEvent) => {
  let event = createSyntheticFormEvent(evt);

  applySideEffects(sideEffects, event, props)
    .then((event) => props.onChange(event))
    .catch((err) => props.onError(err, constants.SIDE_EFFECTS_ERROR));
};

const withSideEffects = (sideEffects: SideEffects = []) => (Component: RComponent): RComponent => {

  invariant(
    Array.isArray(sideEffects),
    `
    Missing or invalid argument 1 for "withSideEffects".
    Expects an argument 1 of type "array". "${typeof sideEffects}" given.
    `
  );

  const onChangeHandler = handleChange(sideEffects);

  class FormWithSideEffects extends React.Component {
    props: Props

    render() {
      return (
        <Component
          {...this.props}
          onChange={onChangeHandler(this.props)}
        />
      );
    }
  }

  return FormWithSideEffects;
};

export default withSideEffects;
