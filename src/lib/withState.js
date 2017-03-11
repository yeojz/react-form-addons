import React, {PropTypes} from 'react';
import update from 'immutability-helper';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import noop from 'lodash/noop';

const propTypes = {
  formData: PropTypes.object,
  formMeta: PropTypes.object,
  onChange: PropTypes.func
};

const defaultProps = {
  formData: {},
  formMeta: {},
  onChange: noop
};

const withState = (defaultFormData = {}, defaultFormMeta = {}) => (Component) => {

  class ComponentWithState extends React.Component {

    state = {
      formData: {},
      formMeta: {}
    }

    componentWillMount = () => {
      this.setState({
        formData: {
          ...defaultFormData,
          ...this.props.formData
        },
        formMeta: {
          ...defaultFormMeta,
          ...this.props.formMeta
        }
      });
    }

    shouldComponentUpdate = (nextProps, nextState) => (
      !isEqual(this.props, nextProps)
      || !isEqual(this.state, nextState)
    )

    componentWillReceiveProps = (nextProps) => {
      this.setState({
        formData: this.refreshData('formData', nextProps),
        formMeta: this.refreshData('formMeta', nextProps)
      });
    }

    refreshData = (key, nextProps) => (
      update(nextProps[key], {
        $merge: get(this, ['state', key], {})
      })
    )

    handleChange = (syntheticFormEvent) => {
      this.setState({
        formData: {...syntheticFormEvent.formData},
        formMeta: {...syntheticFormEvent.formMeta}
      }, () => {
        this.props.onChange(syntheticFormEvent);
      });
    }

    render() {
      return (
        <Component
          {...this.props}
          formData={this.state.formData}
          formMeta={this.state.formMeta}
          onChange={this.handleChange}
        />
      );
    }
  }

  ComponentWithState.propTypes = propTypes;
  ComponentWithState.defaultProps = defaultProps;
  return ComponentWithState;
};

export default withState;
