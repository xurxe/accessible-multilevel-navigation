import React, { useState } from 'react';
import NavLevel from '../NavLevel';
import NavLink from '../NavLink';
import '../global.css';
import './styles.css';

const NavDropdown = ({ data, style, level }) => {
  const [expanded, setExpanded] = useState(false);
  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className={
        style ? `NavDropdown NavDropdown___${level} NavDropdown___${style}` : ''
      }
    >
      <div
        className={
          style ? `NavDropdown_control NavDropdown_control___${style}` : ''
        }
      >
        <NavLink data={data} style={style} />
        <button
          type="button"
          onClick={handleClick}
          aria-pressed={expanded}
          aria-label={expanded ? `Collapse` : `Expand`}
          className={
            style
              ? `hvr-reveal NavDropdown_button NavDropdown_button___${style} ${
                  expanded
                    ? 'NavDropdown_button___expanded'
                    : 'NavDropdown_button___collapsed'
                }`
              : ''
          }
        >
          <i
            className={
              style
                ? `NavDropdown_icon NavDropdown_icon___${style} ${
                    expanded
                      ? 'NavDropdown_icon___expanded fas fa-chevron-up'
                      : 'NavDropdown_icon___collapsed fas fa-chevron-down'
                  }`
                : `${expanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down'}`
            }
            aria-hidden
          ></i>
        </button>
      </div>

      {expanded ? (
        <NavLevel data={data.children} style={style} level={level + 1} />
      ) : null}
    </div>
  );
};

export default NavDropdown;
