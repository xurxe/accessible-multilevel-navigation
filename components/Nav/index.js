import React from 'react';
import NavLevel from '../NavLevel';
import '../global.css';
import styled, { css } from 'styled-components';

const StyledNav = styled.nav`
  ${({ theme }) =>
    theme &&
    theme.background &&
    css`
      position: fixed;
      z-index: 100;
      background-color: ${theme.background[0]};
    `}

  ${({ theme, layout }) =>
    theme &&
    layout == 'wide' &&
    css`
      left: 0;
      right: 0;
    `}

  ${({ theme, layout }) =>
    theme &&
    layout == 'tall' &&
    css`
      top: 0;
      bottom: 0;
      min-width: 50vw;
      overflow-y: scroll;
    `}

    ${({ theme, layout }) =>
      theme &&
      layout == 'tall' &&
      theme.background &&
      theme.accent &&
      css`
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
