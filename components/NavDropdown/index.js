import React, { useState } from 'react';
import NavLevel from '../NavLevel';
import NavLink from '../NavLink';
import '../global.css';
import styled, { css } from 'styled-components';

const StyledButton = styled.button`

  ${({ theme }) =>
    theme &&
    css`
      margin-left: 0.2em;
      height: 1.2em;
      width: 1.2em;
      border: none;
    `}

  ${({ pressed, theme, level }) =>
    theme &&
    theme.color &&
    theme.background &&
    (pressed === false
      ? css`
          background-color: ${theme.background[
            level % theme.background.length
          ]};
        `
      : css`
          background-color: ${theme.color[level % theme.color.length]};
        `)}

  ${({ theme }) =>
    theme &&
    theme.animated &&
    css`
      transition-property: background-color;
      transition-duration: 0.5s;
      transition-timing-function: ease-out;
    `}

  ${({ theme, level }) =>
    theme &&
    !theme.animated &&
    theme.color &&
    theme.background &&
    css`
      border: 2px solid
        ${theme.background && theme.background[level % theme.background.length]};
      &:hover {
        border: 2px solid
          ${theme.color && theme.color[level % theme.color.length]};
      }
    `}
        
  ${/* Adapted from hover.css */ ''}
  ${({ pressed, theme, level }) =>
    theme.animated &&
    theme.accent &&
    theme.color &&
    css`
      display: inline-block;
      vertical-align: middle;
      transform: perspective(1px) translateZ(0);
      box-shadow: 0 0 1px rgba(0, 0, 0, 0);
      position: relative;
      overflow: hidden;

      &:focus {
        outline: solid transparent;
      }

      &:before {
        content: '';
        position: absolute;
        z-index: -1;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        border-style: solid;
        border-width: 0;
        transition-property: border-width;
        transition-duration: 0.1s;
        transition-timing-function: ease-out;
        border-color: ${pressed && theme.accent && theme.color
          ? theme.accent[level % theme.accent.length]
          : theme.color[level % theme.color.length]};
      }

      &:hover:before,
      &:focus:before {
        transform: translateY(0);
        border-width: 2px;
      }
    `}
`;

const StyledI = styled.i`
  ${({ theme }) =>
    theme &&
    css`
      font-size: 0.5em;
      display: block;
    `}

  ${({ pressed, theme, level }) =>
    theme &&
    theme.color &&
    theme.background &&
    (pressed == false
      ? css`
          color: ${theme.color[level % theme.color.length]}};
        `
      : css`
          color: ${theme.background[level % theme.background.length]};
        `)}
`;

const NavDropdown = ({ data, layout, theme, level, previousLevelRef }) => {
  const [pressed, setPressed] = useState(false);
  const [prevLevelHeight, setPrevLevelHeight] = useState(0);
  const handleClick = () => {
    setPressed(!pressed);
    setPrevLevelHeight(previousLevelRef.current.offsetHeight);
  };

  return (
    <div>
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

        <NavLevel
          data={data.children}
          layout={layout}
          theme={theme}
          level={level + 1}
<<<<<<< HEAD
          prevLevelHeight={levelHeight}
=======
					prevLevelHeight={prevLevelHeight}
					expanded={pressed}
>>>>>>> 86ae6ef5cb52cbb06e9ea156da02e7e4453bf90a
        />
    </div>
  );
};

export default NavDropdown;
