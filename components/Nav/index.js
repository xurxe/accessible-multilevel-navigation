import React from 'react';
import NavLevel from '../NavLevel';
import '../global.css';
import './styles.css';

const Nav = ({ data, style }) => (
  <nav className={style ? `Nav Nav___${style}` : ''}>
    <NavLevel data={data} style={style} level={0} />
  </nav>
);

export default Nav;
