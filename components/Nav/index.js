import React from 'react';
import NavLevel from '../NavLevel';
import '../global.css';
import './styles.css';

const Nav = ({ data, layout, color, animated }) => (
  <nav className={layout ? `Nav Nav___${layout}` : ''}>
    <NavLevel
      data={data}
      layout={layout}
      color={color}
      animated={animated}
      level={0}
    />
  </nav>
);

export default Nav;
