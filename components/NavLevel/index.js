import React, { useRef } from 'react';
import styled from 'styled-components';
import NavDropdown from '../NavDropdown';
import NavLink from '../NavLink';
import RestartButton from '../RestartButton';
import '../global.css';

const StyledUl = styled.ul`

  ${({ theme, level, animated }) =>
    theme &&
    theme.background &&
    `
      display: flex;
      margin: 0;
      background-color: ${theme.background[level % theme.background.length]};
      opacity: 1;
      transition: ${animated ? '0.6s opacity ease-out' : 'none'};
    `}

	${({ expanded, animated }) =>
    !expanded &&
    `
      visibility: hidden;
      opacity: 0;
      position: absolute;
      top: -9999px;
      left: -9999px;
      ${animated ? '0.6s opacity ease-out, 0s visibility 0.6s' : 'none'};
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
  theme,
  layout,
  animated,
  level,
  prevLevelHeight,
  expanded,
  prevButtonRef,
}) => {
  const currentLevelRef = useRef(null);

  return (
    <StyledUl
      theme={theme}
      layout={layout}
      animated={animated}
      level={level}
      prevLevelHeight={prevLevelHeight}
      expanded={expanded}
      ref={currentLevelRef}
      role={level == 0 ? 'tree' : 'group'}
    >
      {data.map((item, index) => (
        <StyledLi
          theme={theme}
          layout={layout}
          key={item.id}
          role={item.children ? 'treeitem' : 'none'}
        >
          {item.children ? (
            <NavDropdown
              data={item}
              theme={theme}
              layout={layout}
              animated={animated}
              level={level}
              previousLevelRef={currentLevelRef}
              prevButtonRef={index == data.length - 1 && prevButtonRef}
            />
          ) : (
            <>
              <NavLink
                data={item}
                theme={theme}
                animated={animated}
                level={level}
              />
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
