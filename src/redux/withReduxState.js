import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import get from 'lodash/get';
import noop from 'lodash/noop';
import actions from './actions';

const propTypes = {
  getReduxData: PropTypes.func,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onReset: PropTypes.func,
  onSubmit: PropTypes.func
};

const defaultProps = {
  name: 'default',
  onChange: noop,
  onSubmit: noop
};

const withReduxState = (reducerKey = 'forms') => (Component) => {

  class ComponentWithReduxState extends React.Component {

    handleChange = (syntheticFormEvent) => {
      this.props.onChange(this.props.name, syntheticFormEvent);
    }

    handleReset = () => {
      this.props.onReset(this.props.name);
    }

    handleSubmit = () => {
      const data = this.props.getReduxData(this.props.name);
      this.props.onSubmit(data.formData, data.formMeta);
    }

    render() {
      const data = this.props.getReduxData(this.props.name);

      return (
        <Component
          {...this.props}
          formData={data.formData}
          formMeta={data.formMeta}
          name={void 0}
          onChange={this.handleChange}
          onReset={this.handleReset}
          onSubmit={this.handleSubmit}
        />
      );
    }
  }

  ComponentWithReduxState.propTypes = propTypes;
  ComponentWithReduxState.defaultProps = defaultProps;

  const mapStateToProps = (state) => ({
    getReduxData: (name) => ({
      formData: get(state, [reducerKey, 'data', name, 'formData'], {}),
      formMeta: get(state, [reducerKey, 'data', name, 'formMeta'], {})
    })
  });

  const mapDispatchToProps = {
    onChange: actions.update,
    onReset: actions.reset
  };

  return connect(mapStateToProps, mapDispatchToProps)(ComponentWithReduxState);
};

export default withReduxState;
