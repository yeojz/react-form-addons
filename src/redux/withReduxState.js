// @flow
import React from 'react';
import {connect} from 'react-redux';
import get from 'lodash/get';
import noop from 'lodash/noop';
import formActions from './formActions';

type Props = {
  getReduxData: Function;
  name: string;
  onChange: Function;
  onReset: Function;
};

const withReduxState = (reducerKey: string = 'forms') => (Component: RComponent): RComponent => {

  class ComponentWithReduxState extends React.Component {
    props: Props

    static defaultProps = {
      onChange: noop
    }

    handleChange = (syntheticFormEvent: SyntheticFormEvent): void => {
      this.props.onChange(this.props.name, syntheticFormEvent);
    }

    handleReset = (): void => {
      this.props.onReset(this.props.name);
    }

    render() {
      const data = this.props.getReduxData(this.props.name);

      return (
        <Component
          {...this.props}
          formData={data.formData}
          formMeta={data.formMeta}
          name=''
          onChange={this.handleChange}
          onReset={this.handleReset}
        />
      );
    }
  }

  const mapStateToProps = (state: Object): Object => ({
    getReduxData: (name: string) => ({
      formData: get(state, [reducerKey, 'data', name, 'formData'], {}),
      formMeta: get(state, [reducerKey, 'data', name, 'formMeta'], {})
    })
  });

  const mapDispatchToProps: Object = {
    onChange: formActions.update,
    onReset: formActions.reset
  };

  return connect(mapStateToProps, mapDispatchToProps)(ComponentWithReduxState);
};

export default withReduxState;
