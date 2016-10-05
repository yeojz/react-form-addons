// updateSideEffects({
//     formData,
//     name,
//     prevData,
//     props: this.props
// });

import React, {PropTypes} from 'react';
import noop from 'lodash/noop';

export const propTypes = {
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func
}

export const defaultProps = {
    onCancel: noop,
    onChange: noop,
    onSubmit: noop
}

export default withSideEffect = (Component) => {
    const ComponentWithSideEffect = (props) => {
        return (
            <div />
        )
    }

    ComponentWithSideEffect.propTypes = propTypes;
    ComponentWithSideEffect.defaultProps = defaultProps;
    return ComponentWithSideEffect;
}
