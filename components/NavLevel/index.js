import React, { useState } from 'react';
import NavLink from '../NavLink';
import '../global.css';
import './styles.css';

const NavSublevel = ({ data, level, style }) => {
  const [expanded, setExpanded] = useState(false);
  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <NavLink
        data={data}
        className={style ? `Nav_link Nav_link___${style}` : ''}
        style={style}
      />
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={expanded}
        aria-label={expanded ? `Collapse` : `Expand`}
        className={
          style
            ? `hvr-reveal Nav_button Nav_button___${style} ${
                expanded ? 'Nav_button___expanded' : 'Nav_button___collapsed'
              }`
            : ''
        }
      >
        <i
          className={
            style
              ? `Nav_icon Nav_icon___${style} ${
                  expanded
                    ? 'Nav_icon___expanded fas fa-chevron-up'
                    : 'Nav_icon___collapsed fas fa-chevron-down'
                }`
              : `${expanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down'}`
          }
          aria-hidden
        ></i>
      </button>
      {expanded ? (
        <NavLevel
          data={data.children}
          level={level + 1}
          style={style}
          className={style ? `Nav_level Nav_level___${style}` : ''}
        />
      ) : null}
    </>
  );
};

const NavLevel = ({ data, level, style }) => (
  <>
    <ul
      role={level == 0 ? 'tree' : 'group'}
      className={style ? `Nav_ul Nav_ul___${style}` : ''}
    >
      {data.map(item => (
        <>
          {item.children ? (
            <li
              role="treeitem"
              className={style ? `Nav_li Nav_li___${style}` : ''}
            >
              <NavSublevel data={item} style={style} />
            </li>
          ) : (
            <li role="none" className={style ? `Nav_li Nav_li___${style}` : ''}>
              <NavLink data={item} style={style} />
            </li>
          )}
        </>
      ))}
    </ul>
  </>
);

export default NavLevel;
