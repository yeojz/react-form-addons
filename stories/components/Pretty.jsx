import React, {PropTypes} from 'react';

const propTypes = {
    data: PropTypes.object
}

const Pretty = (props) => {
    return (
        <div className='p2 border-box border'>
            <pre>{JSON.stringify(props.data, null, 2)}</pre>
        </div>
    )
}

Pretty.propTypes = propTypes;
export default Pretty;
