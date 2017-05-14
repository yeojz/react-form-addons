// @flow
import React from 'react';
import update from 'immutability-helper';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import noop from 'lodash/noop';

type Props = {
  formData: Object;
  formMeta: Object;
  onChange: Function;
};

type State = {
  formData: Object;
  formMeta: Object;
}

const withState = (defaultConfig: Object = {}) => (Component: ReactClass<any>): ReactClass<any> => {

  const config = {
    formData: {},
    formMeta: {},
    shouldComponentUpdate: null,
    ...defaultConfig
  }

  class ComponentWithState extends React.Component {
    props: Props

    static defaultProps = {
      formData: {},
      formMeta: {},
      onChange: noop
    }

    state: State = {
      formData: {},
      formMeta: {}
    }

    componentWillMount = (): void => {
      this.setState({
        formData: {
          ...config.formData,
          ...this.props.formData
        },
        formMeta: {
          ...config.formMeta,
          ...this.props.formMeta
        }
      });
    }

    shouldComponentUpdate = (nextProps: Props, nextState: State): boolean => {
      if (config.shouldComponentUpdate) {
        return config.shouldComponentUpdate(nextProps, nextState);
      }

      return !isEqual(this.props, nextProps)
        || !isEqual(this.state, nextState);
    }

    componentWillReceiveProps = (nextProps: Props): void => {
      this.setState({
        formData: this.refreshData('formData', nextProps),
        formMeta: this.refreshData('formMeta', nextProps)
      });
    }

    refreshData = (key: string, nextProps: Props): Object => (
      update(nextProps[key], {
        $merge: get(this, ['state', key], {})
      })
    )

    handleChange = (syntheticFormEvent: SyntheticFormEvent): void => {
      syntheticFormEvent.removeEventActions();

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

  return ComponentWithState;
};

export default withState;
