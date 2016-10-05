import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import update from 'react-addons-update';

export const eventPreventDefault = (event) => {
    if (isObject(event) && isFunction(event.preventDefault)) {
        event.preventDefault();
    }
}

export const updateFormData = (instance, event, name, value) => {
    const currentFormData = get(context, 'state.formData', {});
    const formData = update(currentFormData, {
        [name]: {$set: value}
    });
    instance.setState({formData}, () => instance.props.onChange(event, formData));
}

export const onChange = (instance) => (event) => {
    eventPreventDefault(event);
    const name = get(event, 'target.name');
    const value = get(event, 'target.value');
    updateFormData(instance, event, name, value);
}

export const onToggle = (instance) => (event) => {
    const name = get(event, 'target.name');
    const value = get(instance, ['state', 'formData', name]) ? false : true;
    updateFormData(instance, event, name, value);
}

export const onCancel = (instance) => (event) => {
    eventPreventDefault(event);
    const formData = get(instance, 'state.formData');
    instance.props.onCancel(event, formData);
}

export const onSubmit = (instance) => (event, customData) => {
    eventPreventDefault(event);
    const formData = get(instance, 'state.formData');
    instance.props.onSubmit(event, formData, customData);
}
