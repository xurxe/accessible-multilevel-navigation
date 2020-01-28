import React, { useState } from 'react';
import NavLevel from '../NavLevel';
import NavLink from '../NavLink';
import '../global.css';
import './styles.css';

const NavDropdown = ({ data, layout, level }) => {
  const [expanded, setExpanded] = useState(false);
  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className={
        layout
          ? `NavDropdown NavDropdown___${level} NavDropdown___${layout}`
          : ''
      }
    >
      <div
        className={
          layout ? `NavDropdown_control NavDropdown_control___${layout}` : ''
        }
      >
        <NavLink data={data} layout={layout} />
        <button
          type="button"
          onClick={handleClick}
          aria-pressed={expanded}
          aria-label={
            expanded ? `Collapse ${data.text}` : `Expand ${data.text}`
          }
          className={
            layout
              ? `hvr-reveal NavDropdown_button NavDropdown_button___${layout} ${
                  expanded
                    ? 'NavDropdown_button___expanded'
                    : 'NavDropdown_button___collapsed'
                }`
              : ''
          }
        >
          <i
            className={
              layout
                ? `NavDropdown_icon NavDropdown_icon___${layout} ${
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
        <NavLevel data={data.children} layout={layout} level={level + 1} />
      ) : null}
    </div>
  );
};

export default NavDropdown;
