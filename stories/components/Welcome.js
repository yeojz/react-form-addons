import React, {PropTypes} from 'react';
import './_welcome.css';

const GITHUB_URL = 'https://github.com/yeojz/react-form-addons';
const NPM_URL = 'https://www.npmjs.com/package/react-form-addons';
const DOC_URL = 'https://github.com/yeojz/react-form-addons/tree/master/docs';

const Welcome = (props) => {
    return (
        <div className='welcome p4'>
            <h1>react-form-addons</h1>
            <hr />
            <p>Higher Order Form Components and Helpers</p>
            <p>
                This library aims to help keep form input components as pure
                stateless components by abstracting the state and various other utilities
                out into Higher Order methods.
            </p>
            <ul>
                <li><a href={GITHUB_URL}>Github</a></li>
                <li><a href={NPM_URL}>NPM</a></li>
                <li><a href={DOC_URL}>Documentation</a></li>
            </ul>
        </div>
    )
}

export default Welcome;
