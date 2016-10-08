import React, {PropTypes} from 'react';
import 'github-markdown-css'
import readme from 'README.md';
import './_welcome.css';

const Welcome = (props) => {
    return (
        <div className='welcome'>
            <section className='markdown-body border rounded'>
                <div dangerouslySetInnerHTML={{__html: readme}} />
            </section>
        </div>
    )
}

export default Welcome;
