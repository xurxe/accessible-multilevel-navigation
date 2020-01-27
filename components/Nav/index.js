import React from 'react';
import NavLevel from '../NavLevel';

const Nav = ({ data }) => (
  <nav>
    <NavLevel data={data} level={0} />
  </nav>
);

export default Nav;
