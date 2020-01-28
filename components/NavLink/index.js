import React from 'react';
import '../global.css';
import './styles.css';

const NavLink = ({ data, layout }) => (
  <a
    href={`https://example.com/${data.slug}`}
    className={
      layout ? `NavLink NavLink___${layout} hvr-underline-from-center` : ''
    }
  >
    {data.text}
  </a>
);

export default NavLink;
