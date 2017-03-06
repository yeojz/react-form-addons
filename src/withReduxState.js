import React, {PropTypes} from 'react';
import {connect} from 'redux';
import get from 'lodash/get';
import noop from 'lodash/noop';
import actions from './redux/actions';

const propTypes = {
  formData: PropTypes.object,
  formMeta: PropTypes.object,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

const defaultProps = {
  formData: {},
  formMeta: {},
  name: 'default',
  onChange: noop,
  onSubmit: noop
};

const withReduxState = (reducerKey = 'forms') => (Component) => {

  class ComponentWithReduxState extends React.Component {

    handleChange = (syntheticFormEvent) => {
      this.props.onChange(this.props.name, syntheticFormEvent);
    }

    handleSubmit = () => {
      this.props.onSubmit(this.state.formData, this.state.formMeta);
    }

    render() {
      return (
        <Component
          {...this.props}
          formData={this.props.formData}
          formMeta={this.props.formMeta}
          name={void 0}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
      );
    }
  }

  ComponentWithReduxState.propTypes = propTypes;
  ComponentWithReduxState.defaultProps = defaultProps;

  const mapStateToProps = (state, ownProps) => ({
    formData: get(state, [reducerKey, ownProps.name, 'formData'], {}),
    formMeta: get(state, [reducerKey, ownProps.name, 'formMeta'], {})
  });

  const mapDispatchToProps = {
    onChange: actions.update
  };

  return connect(mapStateToProps, mapDispatchToProps)(ComponentWithReduxState);
};

export default withReduxState;
