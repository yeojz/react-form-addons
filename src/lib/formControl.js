// @flow
import React from 'react';
import invariant from 'invariant';
import omit from 'lodash/omit';
import isEqual from 'lodash/isEqual';

type Props = {
  name: string,
  defaultValue: any,
  disabled: boolean,
  onChange: Function,
  onToggle: Function,
  value: any
}

type State = {
  value: any
}

const propKeys = [
  'name',
  'defaultValue',
  'disabled',
  'onChange',
  'onToggle',
  'value'
];

const formControl = (Element: Function | string): ReactClass<any> => {

  invariant(
    typeof Element === 'function' || typeof Element === 'string',
    `
    Missing or invalid argument 1 for "formControl".
    Expects one of string:["input", "textarea"] or React Element.
    `
  );

  class Control extends React.Component {
    props: Props

    static defaultProps = {
      defaultValue: ''
    }

    state: State = {
      value: void 0
    }

    componentWillMount = (): void => {
      this.setState({value: this.props.value});
    }

    shouldComponentUpdate = (nextProps: Props, nextState: State): boolean => (
      !isEqual(this.props, nextProps)
      || !isEqual(this.state, nextState)
    )

    componentWillReceiveProps = (nextProps: Props): void => {
      if (nextProps.value !== this.state.value) {
        this.setState({value: nextProps.value});
      }
    }

    getValue = (): string | boolean | void => {
      if (typeof this.state.value === 'undefined') {
        return this.props.defaultValue;
      }
      return this.state.value;
    }

    handleChange = (evt: PseudoEvent) => {
      if (!this.props.disabled) {
        const handler = this.props.onChange || this.props.onToggle;
        this.setState({value: evt.target.value});
        handler(evt);
      }
    }

    render() {
      const props: Object = omit(this.props, propKeys)

      return (
        <Element
          {...props}
          disabled={this.props.disabled}
          name={this.props.name}
          onChange={this.handleChange}
          value={this.getValue()}
        />
      );
    }
  }

  return Control;
}

export default formControl;
