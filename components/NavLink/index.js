import React from 'react';
import '../global.css';
import styled, { css } from 'styled-components';

const StyledA = styled.a`
  ${({ theme, level }) =>
    theme &&
    theme.color &&
    theme.accent &&
    css`
      color: ${theme.color[level % theme.color.length]};
      &:hover {
        text-decoration: none;
      }
      &:active {
        color: ${theme.accent[level % theme.accent.length]};
      }
    `}

  ${({ polarity }) =>
    polarity &&
    css`
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -o-font-smoothing: antialiased;
    `}

  ${/* Adapted from hover.css */ ''}
  ${({ theme, level }) =>
    theme &&
    theme.animated &&
    theme.color &&
    theme.accent &&
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
        background: ${theme.color[level % theme.color.length]};
        transition-property: left, right;
        transition-duration: 0.3s;
        transition-timing-function: ease-out;
      }

      &:hover:after {
        height: 2px;
        left: 0;
        right: 0;
      }

      &:active:before {
        background: ${theme.accent[level % theme.accent.length]};
      }

      &:after {
        content: '';
        position: absolute;
        z-index: -1;
        left: 51%;
        right: 51%;
        top: -0.1em;
        background: ${theme.color[level % theme.color.length]};
        transition-property: left, right;
        transition-duration: 0.3s;
        transition-timing-function: ease-out;
      }

      &:focus:before {
        height: 2px;
        left: 0;
        right: 0;
      }

      &:active:after {
        background: ${theme.accent[level % theme.accent.length]};
      }
    `}
`;

const NavLink = ({ data, theme, level }) => {
  const getLuminance = hexcode => {
    // two digits for each (R, G, B)
    const rawR = hexcode.slice(1, 3);
    const rawG = hexcode.slice(3, 5);
    const rawB = hexcode.slice(5, 7);

    // convert to integer (0-255)
    const R = parseInt(rawR, 16);
    const G = parseInt(rawG, 16);
    const B = parseInt(rawB, 16);

    // get max and min from RGB values
    const rawMax = Math.max(R, G, B);
    const rawMin = Math.min(R, G, B);

    // convert to 0-1 range
    const max = rawMax / 255;
    const min = rawMin / 255;

    return (max + min) / 2;
  };

  // returns true for light foreground on dark background, false otherwise
  const getPolarity = (hexForeground, hexBackground) => {
    const luminanceForeground = getLuminance(hexForeground);
    const luminanceBackground = getLuminance(hexBackground);
    console.log(luminanceForeground);
    return luminanceForeground > luminanceBackground ? true : false;
  };

  // returns true if there's a theme and light foreground on dark background, false otherwise
  const getThemePolarity = (theme, level) => {
    if (theme && theme.color && theme.background) {
      console.log(theme.color[level % theme.color.length]);
      return getPolarity(
        theme.color[level % theme.color.length],
        theme.background[level % theme.background.length]
      );
    }
    return false;
  };

  const polarity = getThemePolarity(theme, level);

  return (
    <StyledA
      href={`https://example.com/${data.slug}`}
      theme={theme}
      level={level}
      polarity={polarity}
    >
      {data.text}
    </StyledA>
  );
};

export default NavLink;
