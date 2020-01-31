import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import NavLevel from '../NavLevel';
import NavLink from '../NavLink';
import RestartButton from '../RestartButton';
import '../../global.css';

const StyledButton = styled.button`
  ${({ theme }) =>
    theme &&
    theme.color &&
    `
    padding: 0;
    margin-left: 0.3em;
    height: 1.2em;
    width: 1.2em;
    border: none;
    }
  `}

  ${({ pressed, theme, level }) =>
    theme &&
    theme.color &&
    theme.background &&
    (!pressed
      ? `
          color: ${theme.color[level % theme.color.length]}};
          background-color: ${
            theme.background[level % theme.background.length]
          };
        `
      : `
          color: ${theme.background[level % theme.background.length]};
          background-color: ${theme.color[level % theme.color.length]};
        `)}

  ${({ theme }) =>
    theme &&
    `
      transition-property: background-color;
      transition-duration: 0.5s;
      transition-timing-function: ease-out;
    `}
        
  ${/* Adapted from hover.css */ ''}
  ${({ theme, level, pressed }) =>
    theme.accent &&
    theme.color &&
    `
      display: inline-block;
      vertical-align: middle;
      transform: perspective(1px) translateZ(0);
      box-shadow: 0 0 1px rgba(0, 0, 0, 0);
      color: ${
        !pressed
          ? theme.color[level % theme.color.length]
          : theme.background[level % theme.background.length]
      };
      transition-property: color background;
      transition-duration: 0.2s;

      &:hover {
        color: ${
          !pressed
            ? theme.background[level % theme.background.length]
            : theme.color[level % theme.color.length]
        };
        background-color: ${
          !pressed
            ? theme.color[level % theme.color.length]
            : theme.background[level % theme.background.length]
        };
      }

      &:focus {
        color: ${theme.background[level % theme.background.length]};
        background-color: ${theme.color[level % theme.color.length]};
      }

      &:after {
        content: '';
        position: absolute;
        z-index: -1;
        left: 2px;
        right: 2px;
        top: 2px;
        bottom: 2px;
        border-style: solid;
        border-width: 2.5px;
        border-color: ${theme.background[level % theme.background.length]};
        opacity: 0;
        transition-property: opacity boder-color;
        transition-duration: 0.5s;
        transition-timing-function: ease-out;
      }

      &:hover:after {
        border-color: ${theme.color[level % theme.color.length]};
      }

      &:focus:after {
        opacity: 1;
      }
    `}
`;

const StyledI = styled.i`
  ${({ theme }) =>
    theme &&
    `
      font-size: 0.5em;
      display: block;
    `}
`;

const NavDropdown = ({
  data,
  layout,
  theme,
  level,
  previousLevelRef,
  prevButtonRef,
}) => {
  const [pressed, setPressed] = useState(false);
  const [prevLevelHeight, setPrevLevelHeight] = useState(0);
  const handleClick = () => {
    setPressed(!pressed);
    setPrevLevelHeight(previousLevelRef.current.offsetHeight);
  };
  const currentDropdownRef = useRef(null);
  const currentButtonRef = useRef(null);
  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
  }, []);

  const handleOutsideClick = e => {
    if (
      currentDropdownRef.current &&
      !currentDropdownRef.current.contains(e.target)
    ) {
      setPressed(false);
    }
  };

  return (
    <div ref={currentDropdownRef}>
      <div>
        <NavLink data={data} layout={layout} theme={theme} level={level} />
        <StyledButton
          type="button"
          onClick={handleClick}
          aria-pressed={pressed}
          aria-label={pressed ? `Collapse ${data.text}` : `Expand ${data.text}`}
          pressed={pressed}
          theme={theme}
          level={level}
          ref={currentButtonRef}
        >
          <StyledI
            className={pressed ? 'fas fa-chevron-up' : 'fas fa-chevron-down'}
            pressed={pressed}
            aria-hidden
            theme={theme}
            level={level}
          ></StyledI>
        </StyledButton>
      </div>
      {prevButtonRef && !pressed && (
        <RestartButton prevButtonRef={prevButtonRef}>
          Restart this level
        </RestartButton>
      )}

      <NavLevel
        data={data.children}
        layout={layout}
        theme={theme}
        level={level + 1}
        prevLevelHeight={prevLevelHeight}
        expanded={pressed}
        prevButtonRef={currentButtonRef}
      />
    </div>
  );
};

export default NavDropdown;
