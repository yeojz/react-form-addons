import React, {PropTypes} from 'react';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import noop from 'lodash.noop';
import omit from 'lodash.omit';
import * as fx from './fx';

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

export const withState = (options = {}) => (Component) => {
    const defaultFormData = get(options, 'defaultFormData', {});
    const getFormDataOnReceiveProps = get(options, 'getFormDataOnReceiveProps', fx.defaultGetFormDataOnReceiveProps);

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
            const formData = getFormDataOnReceiveProps(this)(nextProps);
            if (!isEmpty(formData)) {
                this.setState({formData});
            }
        }

        propagateUp = (handler, evt, formData) => {
            return get(this.props, handler)(evt, formData);
        }

        getFormData = (evt, handler) => {
            const {formData} = this.state;
            return get(fx, handler)(evt, formData);
        }

        handleSetFormData = (formData) => {
            const evt = {bulk: true};
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
