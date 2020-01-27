import React from 'react';

const NavLink = ({ data }) => (
  <a href={`https://example.com/${data.slug}`}>{data.text}</a>
);

export default NavLink;
