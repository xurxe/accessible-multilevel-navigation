import React, { useRef } from 'react';
import styled from 'styled-components';
import NavDropdown from '../NavDropdown';
import NavLink from '../NavLink';
import RestartButton from '../RestartButton';
import '../../global.css';

const StyledUl = styled.ul`

  ${({ theme, level }) =>
    theme &&
    theme.background &&
    `
      display: flex;
      margin: 0;
      padding: 0;
      background-color: ${theme.background[level % theme.background.length]};
      opacity: 1;
    `}

	${({ expanded }) =>
    !expanded &&
    `
      visibility: hidden;
      opacity: 0;
      position: absolute;
      top: -9999px;
    `}

  ${({ layout }) =>
    layout &&
    layout == 'tall' &&
    `
      flex-direction: column;
      height: 100%;
      padding: 0.5em 1em;
      margin-top: 0.5em;
    `}


  ${({ layout, prevLevelHeight }) =>
    layout &&
    layout == 'wide' &&
    `
      flex-direction: row;
      flex-wrap: wrap;
      position: absolute;
      right: 0;
      top: ${prevLevelHeight ? `${prevLevelHeight - 2}px` : '3.5em'};
      left: 0;
      padding: 0.75em 1.5em;
    `}

  ${({ theme, level }) =>
    theme &&
    level == 0 &&
    `
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
    `
      list-style: none;
      padding-top: 0.25em;
      padding-bottom: 0.25em;
      padding-right: ${layout == 'wide' ? '1.5em' : '0'};
    `}
`;

const NavLevel = ({
  data,
  layout,
  theme,
  level,
  prevLevelHeight,
  expanded,
  prevButtonRef,
}) => {
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
      {data.map((item, index) => (
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
              prevButtonRef={index == data.length - 1 ? prevButtonRef : null}
            />
          ) : (
            <>
              <NavLink data={item} theme={theme} level={level} />
              {index === data.length - 1 && (
                <RestartButton prevButtonRef={prevButtonRef} />
              )}
            </>
          )}
        </StyledLi>
      ))}
    </StyledUl>
  );
};

export default NavLevel;
