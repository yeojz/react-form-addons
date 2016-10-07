import React, {PropTypes} from 'react';
import get from 'lodash.get';
import noop from 'lodash.noop';
import * as fx from 'fx';

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

const propagateUp = (props, handler, evt, formData) => {
    if (isFunction(props.setFormData)) {
        props.setFormData(formData);
        return;
    }
    get(props, handler)(evt, formData, ...args)
}

export const handleEvents = (sideEffects, props) => (handler) => (evt) => {
    const name = get(evt, 'target.name');
    const formData = get(fx, handler)(evt, props.formData);
    const finalData = sideEffects(formData, name, {
        prevData: props.formData,
        props
    });
    propgateUp(props, handler, evt, finalData)
}

export default withSideEffect = (sideEffects = fx.passthrough) => (Component) => {
    const ComponentWithSideEffect = (props) => {
        const propPass = omit(props, propTypes);
        const events = handleEvents(sideEffects, props);

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
