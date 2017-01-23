import React from 'react';
import logo from '../logo.svg';
const propTypes = {
}

const Header = () => (
  <header className='app-header'>
    <img className='logo' src={logo} alt=''/>
    <h1>react-form-addons</h1>
  </header>
);

Header.propTypes = propTypes;
export default Header;
