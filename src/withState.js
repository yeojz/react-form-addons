import React, {PropTypes} from 'react';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import noop from 'lodash/noop';
import omit from 'lodash/omit';

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

export function withState(Form, defaultFormData = {}, updateSideEffects = null) {
    return class FormWithState extends React.Component {
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
            if (isEqual(nextProps.defaultValue, this.props.defaultValue)) {
                return;
            }
            const formData = {
                ...this.props.defaultValue,
                ...this.state.formData
            }
            this.setState({formData});
        }

        eventPreventDefault = (event) => {
            if (isFunction(event)) {
                event.preventDefault();
            }
        }

        handleSideEffects = (formData, prevData) => {
            if (updateSideEffects && isFunction(updateSideEffects)) {
                return updateSideEffects({
                    formData,
                    name,
                    prevData,
                    props: this.props
                });
            }

            return formData;
        }

        insertIntoFormData = (name, value) => {
            const formData = {
                ...this.state.formData,
                [name]: value
            }

            return this.handleSideEffects(formData, this.state.formData);
        }

        updateFormData = (event, name, value) => {
            this.eventPreventDefault(event);
            const formData = this.insertIntoFormData(name, value);
            this.setState({formData}, () => this.props.onChange(event, formData));
        }

        handleCancel = (event) => {
            this.eventPreventDefault(event);
            this.props.onCancel(event, this.state.formData);
        }

        handleChange = (event) => {
            const name = get(event, 'target.name');
            const value = get(event, 'target.value');
            this.updateFormData(event, name, value);
        }

        handleToggle = (event) => {
            const name = get(event, 'target.name');
            const value = get(this.state, ['formData', name]) ? false : true;
            this.updateFormData(event, name, value);
        }

        handleSubmit = (event, extraData) => {
            this.eventPreventDefault(event);
            this.props.onSubmit(event, this.state.formData, extraData);
        }

        render() {
            const props = omit(this.props, propTypes);
            return (
                <Form
                    {...props}
                    formData={this.state.formData}
                    onCancel={this.handleCancel}
                    onChange={this.handleChange}
                    onToggle={this.handleToggle}
                    onSubmit={this.handleSubmit} />
            )
        }
    }
}

export default withState;
