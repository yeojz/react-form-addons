import React, {PropTypes} from 'react';
import update from 'react-addons-update';
import get from 'lodash/get';
import noop from 'lodash/noop';
import omit from 'lodash/omit';
import * as defaultFx from './adapter/default';

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

const customEvent = (type) => ({
    _eventType: type,
    preventDefault: noop,
    stopPropagation: noop
});

export const withState = (defaultFormData = {}, adapter = defaultFx) => (Component) => {
    class ComponentWithState extends React.Component {
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
            const shouldAllow = adapter.shouldApplyDefaultValue(this.props, nextProps);
            if (shouldAllow) {
                const formData = update(nextProps.defaultValue, {
                    $merge: get(this.state, 'formData', {})
                });
                this.setState({formData});
            }
        }

        propagateUp = (handler, evt, formData) => {
            return get(this.props, handler)(evt, formData);
        }

        getFormData = (evt, handler) => {
            const {formData} = this.state;
            return get(adapter, handler)(evt, formData);
        }

        handleSetFormData = (formData) => {
            const evt = customEvent('bulk-update');
            const callback = () => this.propagateUp('onChange', evt, formData);
            this.setState({formData}, callback);
        }

        handleChange = (evt) => {
            const formData = this.getFormData(evt, 'onChange');
            const callback = () => this.propagateUp('onChange', evt, formData);
            this.setState({formData}, callback);
        }

        handleToggle = (evt) => {
            const formData = this.getFormData(evt, 'onToggle');
            const callback = () => this.propagateUp('onChange', evt, formData);
            this.setState({formData}, callback);
        }

        handleCancel = (evt, ...args) => {
            const {formData} = this.state;
            this.propagateUp('onCancel', evt, formData);
        }

        handleSubmit = (evt, ...args) => {
            const {formData} = this.state;
            this.propagateUp('onSubmit', evt, formData);
        }

        render() {
            const propPass = omit(this.props, propTypes);
            return (
                <Component
                    {...propPass}
                    formData={this.state.formData}
                    setFormData={this.handleSetFormData}
                    onCancel={this.handleCancel}
                    onChange={this.handleChange}
                    onToggle={this.handleToggle}
                    onSubmit={this.handleSubmit} />
            )
        }
    }

    return ComponentWithState;
}

export default withState;
