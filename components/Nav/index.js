import React, { useEffect } from 'react';
import styled from 'styled-components';
import 'focus-visible';
import NavLevel from '../NavLevel';
import '../global.css';

const StyledNav = styled.nav`
  ${
    /* If a theme is provided, make the nav fixed and give it the starting background color: */ ''
  }
  ${({ theme }) =>
    theme &&
    theme.background &&
    `
      position: fixed;
      z-index: 100;
      background-color: ${theme.background[0]};
    `}

  ${
    /* If a theme is provided and the layout is wide, make nav extend all the way from left to right: */ ''
  }
  ${({ theme, layout }) =>
    theme &&
    layout == 'wide' &&
    `
      left: 0;
      right: 0;
    `}

  ${
    /* If a theme is provided and the layout is tall, make nav extend all the way top to bottom, with a minimum width: */ ''
  }
  ${({ theme, layout }) =>
    theme &&
    layout == 'tall' &&
    `
      top: 0;
      bottom: 0;
      min-width: 50vw;
      overflow-y: scroll;
    `}

  ${
    /* If a theme is provided and the layout is tall, style custom scroll bar: */ ''
  }
  ${({ theme, layout }) =>
    theme &&
    theme.background &&
    theme.accent &&
    layout == 'tall' &&
    `
      &::-webkit-scrollbar {
        width: 0.25rem;
      }

      &::-webkit-scrollbar-track {
        background: ${theme.background[0]};
      }

      &::-webkit-scrollbar-thumb {
        background: ${theme.accent[0]};
      }
    `}
`;

const Nav = props => {
  const { data, theme, layout, animated, ...rest } = props;

  return (
    <StyledNav theme={theme} layout={layout}>
      {/* This script is here because putting it in .storybook/previow-head.html didn't work, even when I tried changing the path: */}
      <script src="/node_modules/focus-visible/dist/focus-visible.min.js"></script>
      <NavLevel
        data={data}
        theme={theme}
        layout={layout}
        animated={animated}
        /* We need to keep track of the level to apply the proper styles down the line: */
        level={0}
        /* "Expanded" is necessary to make the first level display. To-do: add functionality so that the first level can be collapsed into a stand-alone button: */
        expanded={true}
        {...rest}
      />
    </StyledNav>
  );
};

export default Nav;
