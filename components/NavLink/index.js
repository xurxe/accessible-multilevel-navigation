import React from 'react';
import '../global.css';
import './styles.css';

const NavLink = ({ data, style }) => (
  <a
    href={`https://example.com/${data.slug}`}
    className={
      style ? `NavLink NavLink___${style} hvr-underline-from-center` : ''
    }
  >
    {data.text}
  </a>
);

export default NavLink;
