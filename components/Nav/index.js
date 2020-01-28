import React from 'react';
import NavLevel from '../NavLevel';
import '../global.css';
import './styles.css';

const Nav = ({ data, layout }) => (
  <nav className={layout ? `Nav Nav___${layout}` : ''}>
    <NavLevel data={data} layout={layout} level={0} />
  </nav>
);

export default Nav;
