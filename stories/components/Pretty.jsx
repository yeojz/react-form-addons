import React, {PropTypes} from 'react';
import {pretty} from 'js-object-pretty-print';

const propTypes = {
    data: PropTypes.object
}

const FormData = (props) => {
    const html = {
        __html: pretty(props.data, 4, 'html')
    }
    return (
        <div className='col-6 p2 border-box border'>
            <span dangerouslySetInnerHTML={html} />
        </div>
    )
}

FormData.propTypes = propTypes;

export default FormData
