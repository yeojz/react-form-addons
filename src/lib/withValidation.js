import React, {PropTypes} from 'react';
import get from 'lodash/get';
import noop from 'lodash/noop';
import getDataFromKey from './utils/getDataFromKey';
import constants from './constants';
import withSideEffects from './withSideEffects';

const propTypes = {
  formMeta: PropTypes.object,
  onError: PropTypes.func
};

const defaultProps = {
  onError: noop
};

const applyValidations = (rules, formData) => (
  rules.reduce(
    (p, fn) => p.then((err) => fn(err, formData)),
    Promise.resolve(void 0)
  )
);

const getValidator = (rules) => (event, props) => {
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

const withValidation = (rules = []) => (Component) => {
  const validator = getValidator(rules);
  const AppliedComponent = withSideEffects([validator])(Component);

  class ComponentWithValidation extends React.Component {
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
  ComponentWithValidation.propTypes = propTypes;
  ComponentWithValidation.defaultProps = defaultProps;
  return ComponentWithValidation;
};

export default withValidation;
