import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import NavLevel from '../NavLevel';
import NavLink from '../NavLink';
import RestartButton from '../RestartButton';
import '../global.css';

const StyledDiv = styled.div`
  ${({ theme, animated }) =>
    theme &&
    theme.color &&
    !animated &&
    `display: flex;
    align-items: center;`}
`;

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

  ${({ theme, level, animated }) =>
    theme &&
    theme.color &&
    theme.background &&
    !animated &&
    `
    border: 2px solid
      ${theme.background[level % theme.background.length]};
    &:hover, &:focus {
      border: 2px solid
        ${theme.color[level % theme.color.length]};
    }
  `}

  ${({ theme, animated }) =>
    theme &&
    animated &&
    `
      border: none;
      transition: 0.5s background-color ease-out;
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

        
  ${/* Adapted from hover.css */ ''}
  ${({ theme, level, pressed, animated }) =>
    theme.accent &&
    theme.color &&
    animated &&
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
  animated,
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
      <StyledDiv theme={theme} animated={animated}>
        <NavLink
          data={data}
          layout={layout}
          theme={theme}
          animated={animated}
          level={level}
        />
        <StyledButton
          theme={theme}
          animated={animated}
          level={level}
          ref={currentButtonRef}
          type="button"
          onClick={handleClick}
          pressed={pressed}
          aria-pressed={pressed}
          aria-label={pressed ? `Collapse ${data.text}` : `Expand ${data.text}`}
        >
          <StyledI
            theme={theme}
            level={level}
            className={pressed ? 'fas fa-chevron-up' : 'fas fa-chevron-down'}
            pressed={pressed}
            aria-hidden={true}
          ></StyledI>
        </StyledButton>
      </StyledDiv>
      {prevButtonRef && !pressed && (
        <RestartButton prevButtonRef={prevButtonRef}>
          Restart this level
        </RestartButton>
      )}

      <NavLevel
        data={data.children}
        theme={theme}
        layout={layout}
        animated={animated}
        expanded={pressed}
        level={level + 1}
        prevLevelHeight={prevLevelHeight}
        prevButtonRef={currentButtonRef}
      />
    </div>
  );
};

export default NavDropdown;
