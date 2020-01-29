import React from 'react';
import NavLevel from '../NavLevel';
import '../global.css';
import './styles.css';

const Nav = ({ data, layout, color, background, animated }) => (
  <nav className={layout ? `Nav Nav___${layout}` : ''}>
    <NavLevel
      data={data}
      layout={layout}
      color={color}
      background={background}
      animated={animated}
      level={0}
    />
  </nav>
);

export default Nav;
