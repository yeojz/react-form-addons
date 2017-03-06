import React, {PropTypes} from 'react';
import get from 'lodash/get';
import getDataFromKey from './utils/getDataFromKey';
import withSideEffects from './withSideEffects';

const propTypes = {
  formMeta: PropTypes.object
};

const passthrough = () => void 0;

const getErrors = (rules, formData) => (
  rules.reduce(
    (err, fn) => fn(err, formData),
    void 0
  )
);

const applyValidations = (rules) => (event) => {
  const formData = event.formData;
  let formMeta = event.formMeta;

  formMeta.errors = getErrors(rules, formData);
  event.formMeta = formMeta;

  return event;
};

const withValidation = (...validations) => (Component) => {
  const rules = validations.length > 0 ? validations : [passthrough];
  const validator = applyValidations(rules)
  const AppliedComponent = withSideEffects(validator)(Component);

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
  return ComponentWithValidation;
};

export default withValidation;
