import React, {PropTypes} from 'react';
import {pretty} from 'js-object-pretty-print';

const propTypes = {
    data: PropTypes.object
}

const Pretty = (props) => {
    const html = {
        __html: pretty(props.data, 4, 'html')
    }
    return (
        <div className='p2 border-box border'>
            <span dangerouslySetInnerHTML={html} />
        </div>
    )
}

Pretty.propTypes = propTypes;
export default Pretty;
