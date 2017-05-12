// @flow
import React from 'react';
import invariant from 'invariant';
import get from 'lodash/get';
import noop from 'lodash/noop';
import getDataFromKey from '../utils/getDataFromKey';
import constants from './constants';
import withSideEffects from './withSideEffects';

type Props = {
  formMeta: Object,
  onError: Function
};

type Rules = Array<Function>;

const applyValidations = (rules: Rules, formData: Object): Promise<any> => (
  rules.reduce(
    (p, fn) => p.then((err) => fn(err, formData)),
    Promise.resolve(void 0)
  )
);

const getValidator = (rules: Rules) => (event: SyntheticFormEvent, props: Props): Promise<any> => {
  const formData = event.formData;
  let formMeta = event.formMeta;

  return applyValidations(rules, formData)
    .then((err) => {
      formMeta.errors = err;
      event.formMeta = formMeta;
      return event;
    })
    .catch((err) => props.onError(err, constants.VALIDATION_ERROR));
};

const withValidation = (rules: Rules = []) => (Component: ReactClass<any>): ReactClass<any> => {
  invariant(
    Array.isArray(rules),
    `
    Missing or invalid argument 1 for "withValidation".
    Expects an argument 1 of type "array". "${typeof rules}" given.
    `
  );

  const validator = getValidator(rules);
  const AppliedComponent = withSideEffects([validator])(Component);

  class ComponentWithValidation extends React.Component {
    props: Props

    static defaultProps = {
      onError: noop
    };

    render() {
      const errors = get(this.props, 'formMeta.errors');

      return (
        <AppliedComponent
          {...this.props}
          getFormError={getDataFromKey(errors)}
        />
      );
    }
  }

  return ComponentWithValidation;
};

export default withValidation;
