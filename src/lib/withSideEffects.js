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

const applySideEffects = (sideEffects: SideEffects, evt: SyntheticFormEvent, props: Props): Promise<any> => (
  sideEffects.reduce(
    (p: Promise<any>, fn: Function) => p.then((event: SyntheticFormEvent) => fn(event, props)),
    Promise.resolve(evt)
  )
);

const handleChange = (sideEffects: SideEffects) => (props: Props) => (evt: PseudoEvent): void  => {
  let event = createSyntheticFormEvent(evt);

  applySideEffects(sideEffects, event, props)
    .then((event: SyntheticFormEvent) => props.onChange(event))
    .catch((err: Error) => props.onError(err, constants.SIDE_EFFECTS_ERROR));
};

const withSideEffects = (sideEffects: SideEffects = []) => (Component: ReactClass<any>): ReactClass<any> => {

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
