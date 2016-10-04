import React, {PropTypes} from 'react';
import omit from 'lodash/omit';

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

export function withValidation(Form) {
    return class FormWithState extends React.Component {
        static propTypes = propTypes;
        static defaultProps = defaultProps;

        state = {
            formError: void 0
        }
    }
}
