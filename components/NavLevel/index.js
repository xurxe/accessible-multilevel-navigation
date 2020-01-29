import React, { useRef } from 'react';
import NavDropdown from '../NavDropdown';
import NavLink from '../NavLink';
import '../global.css';
import styled, { css } from 'styled-components';

const StyledUl = styled.ul`

  ${({ theme, level }) =>
    theme &&
    theme.background &&
    css`
      display: flex;
      margin: 0;
      padding: 0;
      background-color: ${theme.background[level % theme.background.length]};
    `}

  ${({ layout }) =>
    layout &&
    layout == 'tall' &&
    css`
      flex-direction: column;
      height: 100%;
      padding: 0.5em 1em;
      margin-top: 0.5em;
    `}


  ${({ layout, levelHeight }) =>
    layout &&
    layout == 'wide' &&
    css`
      flex-direction: row;
      flex-wrap: wrap;
      position: absolute;
      right: 0;
      top: ${levelHeight - 2}px;
      left: 0;
      padding: 1em 1.5em;
    `}

  ${({ theme, level }) =>
    theme &&
    level == 0 &&
    css`
      position: static;
      margin-top: 0;
      height: 100%;
      width: 100%;
    `}
`;

const StyledLi = styled.li`
  ${({ theme, layout }) =>
    theme &&
    layout &&
    css`
      list-style: none;
      ${layout == 'wide' ? 'padding-right: 1em' : 'padding-bottom: 0.5em'}
    `}
`;

const NavLevel = ({ data, layout, theme, level, levelHeight }) => {
  const levelRef = useRef(null);

  return (
    <StyledUl
      role={level == 0 ? 'tree' : 'group'}
      ref={levelRef}
      theme={theme}
      level={level}
      levelHeight={levelHeight}
      layout={layout}
    >
      {data.map(item => (
        <StyledLi
          key={item.id}
          role={item.children ? 'treeitem' : 'none'}
          theme={theme}
          layout={layout}
        >
          {item.children ? (
            <NavDropdown
              data={item}
              layout={layout}
              theme={theme}
              level={level}
              levelRef={levelRef}
            />
          ) : (
            <NavLink data={item} theme={theme} level={level} />
          )}
        </StyledLi>
      ))}
    </StyledUl>
  );
};

export default NavLevel;
