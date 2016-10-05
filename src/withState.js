import React, {PropTypes} from 'react';
import update from 'react-addons-update';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import noop from 'lodash/noop';
import omit from 'lodash/omit';
import * as handlers from './handlers';

export const propTypes = {
    defaultValue: PropTypes.object,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func
}

export const defaultProps = {
    defaultValue: {},
    onCancel: noop,
    onChange: noop,
    onSubmit: noop
}

export const defaultGetStateOnReceiveProps = (instance) => (nextProps) => {
    const defaultValue = get(nextProps, 'defaultValue');
    const propsDefaultValue = get(instance, 'props.defaultValue');

    if (isEqual(defaultValue, propsDefaultValue)) {
        return null;
    }

    return {
        formData: update(defaultValue, {
            $merge: get(instance, 'state.formData', {})
        })
    }
}

export function withState(Component, options = {}) {
    const defaultFormData = get(options, 'defaultFormData', {});
    const getStateOnReceiveProps = get(options, 'getStateOnReceiveProps', defaultGetStateOnReceiveProps);

    return class ComponentWithState extends React.Component {
        static propTypes = propTypes;
        static defaultProps = defaultProps;

        state = {
            formData: {}
        }

        componentWillMount = () => {
            const formData = {
                ...defaultFormData,
                ...this.props.defaultValue
            }
            this.setState({formData});
        }

        componentWillReceiveProps = (nextProps) => {
            const newState = getStateOnReceiveProps(this)(nextProps);
            if (!isEmpty(newState)) {
                this.setState(newState);
            }
        }

        render() {
            const props = omit(this.props, propTypes);
            return (
                <Form
                    {...props}
                    formData={this.state.formData}
                    onCancel={handlers.onCancel(this)}
                    onChange={handlers.onChange(this)}
                    onToggle={handlers.onToggle(this)}
                    onSubmit={handlers.onSubmit(this)} />
            )
        }
    }
}

export default withState;
