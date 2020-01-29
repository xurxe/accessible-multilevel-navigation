import React, { useState } from 'react';
import NavLevel from '../NavLevel';
import NavLink from '../NavLink';
import '../global.css';
import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  ${({ layout }) =>
    layout &&
    css`
      margin-left: 0.2em;
      height: 1.2em;
      width: 1.2em;
      border: none;
    `}

  ${({ pressed, color, background }) =>
    pressed == false
      ? css`
          background-color: ${background};
        `
      : css`
          background-color: ${color};
        `}

  ${/* Adapted from hover.css */ ''}
  ${({ animated, pressed, color, background }) =>
    animated &&
    css`
      display: inline-block;
      vertical-align: middle;
      transform: perspective(1px) translateZ(0);
      box-shadow: 0 0 1px rgba(0, 0, 0, 0);
      position: relative;
      overflow: hidden;

      &:focus {
        outline: none;
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
        border-color: ${pressed ? color : background};
      }

      &:hover:before {
        transform: translateY(0);
        border-width: 2px;
      }
    `}
  
`;

const StyledIcon = styled.i`
  ${({ layout }) =>
    layout &&
    css`
      font-size: 0.5em;
      display: block;
    `}

  ${({ pressed, color, background }) =>
    pressed == false
      ? css`
          color: ${color};
        `
      : css`
          color: ${background};
        `}
`;

const NavDropdown = ({
  data,
  layout,
  color,
  background,
  animated,
  level,
  levelRef,
}) => {
  const [pressed, setPressed] = useState(false);
  const [levelHeight, setLevelHeight] = useState(0);
  const handleClick = () => {
    setPressed(!pressed);
    setLevelHeight(levelRef.current.offsetHeight);
  };

  return (
    <div>
      <div>
        <NavLink
          data={data}
          layout={layout}
          color={color}
          animated={animated}
        />
        <StyledButton
          type="button"
          onClick={handleClick}
          aria-pressed={pressed}
          pressed={pressed}
          aria-label={pressed ? `Collapse ${data.text}` : `Expand ${data.text}`}
          color={color}
          background={background}
          animated={animated}
          layout={layout}
        >
          <StyledIcon
            className={pressed ? 'fas fa-chevron-up' : 'fas fa-chevron-down'}
            pressed={pressed}
            color={color}
            background={background}
            aria-hidden
            layout={layout}
          ></StyledIcon>
        </StyledButton>
      </div>

      {pressed ? (
        <NavLevel
          data={data.children}
          layout={layout}
          color={color}
          background={background}
          animated={animated}
          level={level + 1}
          levelHeight={levelHeight}
        />
      ) : null}
    </div>
  );
};

export default NavDropdown;
