import React from 'react';
import '../global.css';
import styled, { css } from 'styled-components';

const StyledA = styled.a`
  ${({ theme, level }) =>
    theme &&
    theme.color &&
    css`
      color: ${theme.color[level % theme.color.length]};
    `}

  ${/* To do: make this work for all light text on dark background */ ''}
  ${({ theme, level }) =>
    theme &&
    theme.color &&
    theme.color[level % theme.color.length] == 'white' &&
    css`
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -o-font-smoothing: antialiased;
    `}

  ${({ theme }) =>
    theme &&
    !theme.animated &&
    css`
      &:hover {
        text-decoration: none;
      }
    `}

  ${/* Adapted from hover.css */ ''}
  ${({ theme, level }) =>
    theme &&
    theme.animated &&
    theme.color &&
    css`
      vertical-align: middle;
      transform: perspective(1px) translateZ(0);
      position: relative;
      overflow: hidden;
      padding-bottom: 0.2em;
      text-decoration: none;

      &:focus {
        outline: solid transparent;
      }

      &:before {
        content: '';
        position: absolute;
        z-index: -1;
        left: 51%;
        right: 51%;
        bottom: 0;
        background: ${theme.color
          ? theme.color[level % theme.color.length]
          : 'white'};
        height: 2px;
        transition-property: left, right;
        transition-duration: 0.3s;
        transition-timing-function: ease-out;
      }

      &:hover:before,
      &:focus:before {
        left: 0;
        right: 0;
      }
    `}
`;

const NavLink = ({ data, theme, level }) => (
  <StyledA
    href={`https://example.com/${data.slug}`}
    theme={theme}
    level={level}
  >
    {data.text}
  </StyledA>
);

export default NavLink;
