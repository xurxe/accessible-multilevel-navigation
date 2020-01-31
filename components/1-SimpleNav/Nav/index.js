import React from 'react';
import styled from 'styled-components';
import 'focus-visible';
import NavLevel from '../NavLevel';
import '../../global.css';

const StyledNav = styled.nav`
  ${
    /* If a theme is provided, make the nav fixed and give it the stating background color */ ''
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
    /* If a theme is provided and the layout is wide, make nav extend all the way from left to right */ ''
  }
  ${({ theme, layout }) =>
    theme &&
    layout == 'wide' &&
    `
      left: 0;
      right: 0;
    `}
  ${
    /* If a theme is provided and the layout is tall, make nav extend all the way top to bottom, with a minimum width */ ''
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
    /* If a theme is provided and the layout is tall, style custom scroll bar */ ''
  }
  ${({ theme, layout }) =>
    theme &&
    layout == 'tall' &&
    theme.background &&
    theme.accent &&
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

const Nav = ({ data, layout, theme }) => (
  <StyledNav theme={theme} layout={layout}>
    <NavLevel
      data={data}
      layout={layout}
      theme={theme}
      level={0}
      expanded={true}
    />
  </StyledNav>
);

export default Nav;
