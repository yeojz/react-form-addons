import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import get from 'lodash/get';
import noop from 'lodash/noop';
import formActions from './formActions';

const propTypes = {
  getReduxData: PropTypes.func,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onReset: PropTypes.func,
  onSubmit: PropTypes.func
};

const defaultProps = {
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
    onChange: formActions.update,
    onReset: formActions.reset
  };

  return connect(mapStateToProps, mapDispatchToProps)(ComponentWithReduxState);
};

export default withReduxState;
