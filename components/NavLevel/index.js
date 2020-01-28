import React, { useState } from 'react';
import NavDropdown from '../NavDropdown';
import NavLink from '../NavLink';
import '../global.css';
import './styles.css';

const NavLevel = ({ data, style, level }) => (
  <ul
    role={level == 0 ? 'tree' : 'group'}
    className={style ? `NavLevel NavLevel___${level} NavLevel___${style}` : ''}
  >
    {data.map(item => (
      <>
        {item.children ? (
          <li
            role="treeitem"
            className={
              style
                ? `NavLevel_li NavLevel_li___${level} NavLevel_li___${style}`
                : ''
            }
          >
            <NavDropdown data={item} style={style} level={level} />
          </li>
        ) : (
          <li
            role="none"
            className={
              style
                ? `NavLevel_li NavLevel_li___${level} NavLevel_li___${style}`
                : ''
            }
          >
            <NavLink data={item} style={style} />
          </li>
        )}
      </>
    ))}
  </ul>
);

export default NavLevel;
