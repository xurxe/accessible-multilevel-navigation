import React from 'react';
import '../global.css';
import './styles.css';

const NavLink = ({ data, style }) => (
  <a
    href={`https://example.com/${data.slug}`}
    className={
      style ? `Nav_link Nav_link___${style} hvr-underline-from-center` : ''
    }
  >
    {data.text}
  </a>
);

export default NavLink;
