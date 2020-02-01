import React from 'react';
import styled from 'styled-components';
import '../global.css';

const StyledA = styled.a`
  ${/* If there's a theme, apply basic styles to the links */ ''}
  ${({ theme, level }) =>
    theme &&
    theme.color &&
    theme.accent &&
    `
      color: ${theme.color[level % theme.color.length]};
      &:active {
        color: ${theme.accent[level % theme.accent.length]};
      }
    `}
  ${
    /* Since the default is dark text on light background, when we do the reverse, many browsers render the text too thick. We apply these styles in the case of positive polarity (light text on dark background), as calculated with some functions later in this file */ ''
  }
  ${({ polarity }) =>
    polarity &&
    `
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -o-font-smoothing: antialiased;
    `}

  ${/* When there's a theme but no animation, use these styles. */ ''}
  ${({ theme, animated }) =>
    theme &&
    theme.color &&
    !animated &&
    `
    text-decoration: none; 
    &:hover, &:focus {
      text-decoration: underline;
    }
    `}

  ${
    /* When there's a theme and animation, use these styles (dapted from hover.css) */ ''
  }
  ${({ theme, level, animated }) =>
    theme &&
    theme.color &&
    theme.accent &&
    animated &&
    `
      text-decoration: none;
      &:hover {
        text-decoration: none;
      }
      vertical-align: middle;
      transform: perspective(1px) translateZ(0);
      position: relative;
      overflow: hidden;
      padding-bottom: 0.2em;
      text-decoration: none;

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

/* This function is used to get the luminance of a hex color */
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

/* This function is used to get the polarity of a foreground/background color combination. It returns true for positive polarity (light foreground on dark background), false otherwise*/
const getPolarity = (hexForeground, hexBackground) => {
  const luminanceForeground = getLuminance(hexForeground);
  const luminanceBackground = getLuminance(hexBackground);
  return luminanceForeground > luminanceBackground ? true : false;
};

const NavLink = ({ data, theme, animated, level }) => {
  /* This function returns true if there's a theme with light foreground on dark background, false otherwise */
  const getThemePolarity = (theme, level) => {
    if (theme && theme.color && theme.background) {
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
      animated={animated}
      level={level}
      polarity={polarity}
    >
      {data.text}
    </StyledA>
  );
};

export default NavLink;
