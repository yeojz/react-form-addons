import React from 'react';
import {Link} from 'react-scroll';
import Header from './Header';
import definitions from '../definitions';

const renderLink = (text, to) => (
  <Link
    activeClass='is-active'
    to={to}
    spy={true}
    smooth={true}
    duration={500}
    >
    {text}
  </Link>
);

const renderLinks = (key) => (
  Object.keys(definitions[key])
    .map((name) => (
      <li key={name}>{renderLink(name, name)}</li>
    ))
);

const Navigation = () => (
  <div className='column is-2 app-nav'>
      <Header />
      <aside className='menu'>
        <ul className='badges'>
          <li>
            <a href='//npmjs.com/package/react-form-addons'>
              <img src='//img.shields.io/npm/v/react-form-addons.svg?style=flat-square' alt='npm' />
            </a>
          </li>
          <li>
            <a href='//github.com/yeojz/react-form-addons'>
              <img src='//img.shields.io/github/stars/yeojz/react-form-addons.svg?style=social&label=Star' alt='' />
            </a>
          </li>
        </ul>
        <p className='menu-label'>Methods</p>
        <ul className='menu-list'>{renderLinks('methods')}</ul>

        <p className='menu-label'>Extensions</p>
        <ul className='menu-list'>{renderLinks('extensions')}</ul>

        <p className='menu-label'>Utils</p>
        <ul className='menu-list'>{renderLinks('utils')}</ul>
      </aside>
  </div>
);

export default Navigation;
