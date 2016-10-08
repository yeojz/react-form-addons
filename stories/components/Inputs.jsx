import React, {PropTypes} from 'react';
import Pretty from './Pretty';

const propTypes = {
    formData: PropTypes.object,
    onChange: PropTypes.func
}

const Inputs = (props) => {
    return (
        <div className='story-inputs'>
            <label className='label'>First</label>
            <input
                className='input'
                name='first'
                onChange={props.onChange}
                value={props.formData.first || ''} />

            <label className='label'>Second</label>
            <input
                className='input'
                name='second'
                onChange={props.onChange}
                value={props.formData.second || ''} />

            <Pretty data={props.formData} />
        </div>
    )
}

Inputs.propTypes = propTypes;
export default Inputs;
