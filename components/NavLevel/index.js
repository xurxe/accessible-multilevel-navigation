import React, { useRef } from 'react';
import NavDropdown from '../NavDropdown';
import NavLink from '../NavLink';
import '../global.css';
import './styles.css';

const NavLevel = ({
  data,
  layout,
  color,
  background,
  animated,
  level,
  levelHeight,
}) => {
  const levelRef = useRef(null);

  return (
    <ul
      role={level == 0 ? 'tree' : 'group'}
      className={
        layout ? `NavLevel NavLevel___${level} NavLevel___${layout}` : ''
      }
      style={
        levelHeight && layout === 'wide'
          ? { top: `${levelHeight - 2}px` }
          : null
      }
      ref={levelRef}
    >
      {data.map(item => (
        <li
          key={item.id}
          role={item.children ? 'treeitem' : 'none'}
          className={
            layout
              ? `NavLevel_item NavLevel_item___${level} NavLevel_item___${layout}`
              : ''
          }
        >
          {item.children ? (
            <NavDropdown
              data={item}
              layout={layout}
              color={color}
              background={background}
              animated={animated}
              level={level}
              levelRef={levelRef}
            />
          ) : (
            <NavLink
              data={item}
              layout={layout}
              color={color}
              animated={animated}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default NavLevel;
