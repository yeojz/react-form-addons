import React, {PropTypes} from 'react';
import invariant from 'invariant';
import omit from 'lodash/omit';
import isEqual from 'lodash/isEqual';

const propTypes = {
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onToggle: PropTypes.func,
  value: PropTypes.any
}

const defaultProps = {
  defaultValue: ''
}

const propKeys = Object.keys(propTypes);

const formControl = (Element) => {

  invariant(
    typeof Element === 'function' || typeof Element === 'string',
    `
    Missing or invalid argument 1 for "formControl".
    Expects one of string:["input", "textarea"] or React Element.
    "${Element}" given
    `
  );

  class Control extends React.Component {

    state = {
      value: void 0
    }

    componentWillMount = () => {
      this.setState({value: this.props.value});
    }

    shouldComponentUpdate = (nextProps, nextState) => (
      !isEqual(this.props, nextProps)
      || !isEqual(this.state, nextState)
    )

    componentWillReceiveProps = (nextProps) => {
      if (nextProps.value !== this.state.value) {
        this.setState({value: nextProps.value});
      }
    }

    getValue = () => {
      if (typeof this.state.value === 'undefined') {
        return this.props.defaultValue;
      }
      return this.state.value;
    }

    handleChange = (evt) => {
      if (!this.props.disabled) {
        const handler = this.props.onChange || this.props.onToggle;
        this.setState({value: evt.target.value});
        handler(evt);
      }
    }

    render() {
      const props = omit(this.props, propKeys)

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

  Control.propTypes = propTypes;
  Control.defaultProps = defaultProps;
  return Control;
}

export default formControl;