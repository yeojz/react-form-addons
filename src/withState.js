import React, {PropTypes} from 'react';
import update from 'immutability-helper';
import get from 'lodash/get';
import noop from 'lodash/noop';
import isPropKeyEqual from './utils/isPropKeyEqual';

const propTypes = {
  formData: PropTypes.object,
  formMeta: PropTypes.object,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

const defaultProps = {
  formData: {},
  formMeta: {},
  onChange: noop,
  onSubmit: noop
};

const withState = (defaultFormData = {}, defaultFormMeta = {}) => (Component) => {

  class ComponentWithState extends React.Component {

    state = {
      formData: {},
      formMeta: {}
    }

    componentWillMount = () => {
      const formData = {
        ...defaultFormData,
        ...this.props.formData
      };
      const formMeta = {
        ...defaultFormMeta,
        ...this.props.formMeta
      };
      this.setState({formData, formMeta});
    }

    componentWillReceiveProps = (nextProps) => {
      this.validateAndRefreshData('formData', nextProps);
      this.validateAndRefreshData('formMeta', nextProps);
    }

    validateAndRefreshData = (key, nextProps) => {
      if (isPropKeyEqual(key,this.props, nextProps)) {
        const data = update(nextProps[key], {
          $merge: get(this, ['state', key], {})
        });
        this.setState({[key]: data});
      }
    }

    handleChange = (syntheticFormEvent) => {
      this.setState({
        formData: syntheticFormEvent.formData,
        formMeta: syntheticFormEvent.formMeta
      });
      this.props.onChange(syntheticFormEvent);
    }

    handleSubmit = () => {
      this.props.onSubmit(this.state.formData, this.state.formMeta);
    }

    render() {
      return (
        <Component
          {...this.props}
          formData={this.state.formData}
          formMeta={this.state.formMeta}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
      );
    }
  }

  ComponentWithState.propTypes = propTypes;
  ComponentWithState.defaultProps = defaultProps;
  return ComponentWithState;
};

export default withState;
