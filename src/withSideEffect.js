import React, {PropTypes} from 'react';
import get from 'lodash.get';
import noop from 'lodash.noop';
import reduce from 'lodash.reduce';
import * as defaultFx from './adapter/default';

export const propTypes = {
    formData: PropTypes.object,
    onChange: PropTypes.func,
    onToggle: PropTypes.func,
    setFormData: PropTypes.func
}

export const defaultProps = {
    formData: {},
    onChange: noop,
    onToggle: noop
}

const passthrough = (data) => data;

const propagateUp = (props, handler, evt, formData) => {
    if (isFunction(props.setFormData)) {
        props.setFormData(formData);
        return;
    }
    get(props, handler)(evt, formData, ...args)
}

export const applySideEffects = (sideEffects, formData, name, props) => {
    if (!Array.isArray(sideEffects)) {
        sideEffects = [sideEffects];
    }
    return reduce(
        sideEffects,
        (newData, fn) => fn(newData, name, props),
        formData
    );
}

export const handleEvents = (sideEffects, props, adapter) => (handler) => (evt) => {
    const name = get(evt, 'target.name');
    const formData = get(adapter, handler)(evt, props.formData);
    const finalData = applySideEffects(sideEffects, formData, name, props);
    propgateUp(props, handler, evt, finalData)
}

export const withSideEffect = (sideEffects = passthrough, adapter = defaultFx) => (Component) => {
    const ComponentWithSideEffect = (props) => {
        const propPass = omit(props, propTypes);
        const events = handleEvents(sideEffects, props, adapter);

        return (
            <Component
                {...propPass}
                formData={props.formData}
                onChange={events('onChange')}
                onToggle={events('onToggle')} />
        )
    }

    ComponentWithSideEffect.propTypes = propTypes;
    ComponentWithSideEffect.defaultProps = defaultProps;
    return ComponentWithSideEffect;
}

export default withSideEffect;
