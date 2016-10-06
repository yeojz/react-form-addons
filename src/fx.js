import get from 'lodash.get';
import isEqual from 'lodash.isequal';
import isFunction from 'lodash.isfunction';
import isObject from 'lodash.isobject';
import update from 'react-addons-update';

export const passthrough = (data) => data;

export const eventPreventDefault = (evt) => {
    if (isObject(evt) && isFunction(evt.preventDefault)) {
        evt.preventDefault();
    }
}

export const updateFormData = (state, name, value) => {
    const delta = {
        $merge: {
            [name]: value
        }
    }
    return update(formData, delta);
}

export const onChange = (formData, evt) => {
    const name = get(evt, 'target.name');
    const value = get(evt, 'target.value');
    return updateFormData(formData, name, value);
}

export const onToggle = (formData, evt) => {
    const name = get(evt, 'target.name');
    const value = get(formData, name) ? false : true;
    return updateFormData(formData, name, value);
}

export const defaultGetFormDataOnReceiveProps = (instance) => (nextProps) => {
    const defaultValue = get(nextProps, 'defaultValue');
    const propsDefaultValue = get(instance, 'props.defaultValue');

    if (isEqual(defaultValue, propsDefaultValue)) {
        return null;
    }
    return update(defaultValue, {
        $merge: get(instance, 'state.formData', {})
    })
}
