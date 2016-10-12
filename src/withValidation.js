import React, {PropTypes} from 'react';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import omit from 'lodash/omit';
import noop from 'lodash/noop';

export const propTypes = {
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
}

export const defaultProps = {
  onCancel: noop,
  onChange: noop,
  onSubmit: noop
}

const propKeys = Object.keys(propTypes);

export const withValidation = (validator = null) => (Component) => {
  class ComponentWithValidation extends React.Component {
    static propTypes = propTypes;
    static defaultProps = defaultProps;

    state = {
      formError: {}
    }

    propagateUp = (handler, evt, formData, err) => {
      const {formError} = this.state;
      get(this.props, handler)(evt, formData, err || formError);
    }

    runValidation = (formData, actionType) => {
      if (!isFunction(validator)) {
         return {};
      }
      return validator(formData, this.props, actionType);
    }

    handleCancel = (evt, formData) => {
      this.propagateUp('onCancel', evt, formData);
    }

    handleChange = (evt, formData) => {
      const formError = this.runValidation(formData, 'change');
      const callback = () => this.propagateUp('onChange', evt, formData);
      this.setState({formError}, callback);
    }

    handleSubmit = (evt, formData) => {
      const formError = this.runValidation(formData, 'submit');
      const callback = () => this.propagateUp('onSubmit', evt, formData);
      this.setState({formError}, callback);
    }

    render() {
      const propPass = omit(this.props, propKeys);
      return (
        <Component
          {...propPass}
          formError={this.state.formError}
          onCancel={this.handleCancel}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit} />
      )
    }
  }

  return ComponentWithValidation;
}

export default withValidation;
