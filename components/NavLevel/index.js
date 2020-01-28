import React from 'react';
import NavDropdown from '../NavDropdown';
import NavLink from '../NavLink';
import '../global.css';
import './styles.css';

const NavLevel = ({ data, layout, level }) => (
  <ul
    role={level == 0 ? 'tree' : 'group'}
    className={
      layout ? `NavLevel NavLevel___${level} NavLevel___${layout}` : ''
    }
  >
    {data.map(item => (
      <>
        {item.children ? (
          <li
            role="treeitem"
            className={
              layout
                ? `NavLevel_item NavLevel_item___${level} NavLevel_item___${layout}`
                : ''
            }
          >
            <NavDropdown data={item} layout={layout} level={level} />
          </li>
        ) : (
          <li
            role="none"
            className={
              layout
                ? `NavLevel_item NavLevel_item___${level} NavLevel_item___${layout}`
                : ''
            }
          >
            <NavLink data={item} layout={layout} />
          </li>
        )}
      </>
    ))}
  </ul>
);

export default NavLevel;
