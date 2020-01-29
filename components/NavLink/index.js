import React from 'react';
import '../global.css';
import './styles.css';
import styled, { css } from 'styled-components';

const Styled = styled.a`
  ${({ color }) =>
    color &&
    css`
      color: ${color};
      text-decoration: none;
    `}

  ${/* To do: make this work for all light text on dark background */ ''}
  ${({ color }) =>
    color == 'white' &&
    css`
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -o-font-smoothing: antialiased;
    `}
    
  ${/* Adapted from hover.css */ ''}
  ${({ animated, color }) =>
    animated &&
    css`
      vertical-align: middle;
      transform: perspective(1px) translateZ(0);
      position: relative;
      overflow: hidden;
      padding-bottom: 0.2em;

      &:focus {
        outline: none;
      }

      &:before {
        content: '';
        position: absolute;
        z-index: -1;
        left: 51%;
        right: 51%;
        bottom: 0;
        background: ${color ? color : 'white'};
        height: 2px;
        transition-property: left, right;
        transition-duration: 0.3s;
        transition-timing-function: ease-out;
      }

      &:hover:before {
        left: 0;
        right: 0;
      }
    `}

`;

const NavLink = ({ data, color, animated }) => (
  <Styled
    href={`https://example.com/${data.slug}`}
    color={color}
    animated={animated}
  >
    {data.text}
  </Styled>
);

export default NavLink;
