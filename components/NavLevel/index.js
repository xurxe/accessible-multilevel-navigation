import React, { useRef, useState, useEffect } from 'react';
import NavDropdown from '../NavDropdown';
import NavLink from '../NavLink';
import '../global.css';
import styled, { css } from 'styled-components';

const StyledUl = styled.ul`

  ${({ theme, level, expanded }) =>
    theme &&
    theme.background &&
    css`
      display: flex;
      margin: 0;
      padding: 0;
			background-color: ${theme.background[level % theme.background.length]};
			opacity: 1;
			transition: 0.6s opacity ease-out;
		`}

	${({ expanded }) =>
		!expanded && 
		css`
			visibility: hidden;
			opacity: 0;
			position: absolute;
			top: -9999px;
			left: -9999px;
			transition: 0.4s opacity ease-out, 0s visibility 0.6s;
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
      top: ${levelHeight ? `${levelHeight - 2}px` : '3.5em'};
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

const NavLevel = ({ data, layout, theme, level, prevLevelHeight, expanded }) => {
	const currentLevelRef = useRef(null);

  return (
    <StyledUl
      role={level == 0 ? 'tree' : 'group'}
      ref={currentLevelRef}
      theme={theme}
      level={level}
      prevLevelHeight={prevLevelHeight}
			layout={layout}
			expanded={expanded}
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
              previousLevelRef={currentLevelRef}
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
