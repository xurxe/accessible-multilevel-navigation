import React, { useRef } from 'react';
import styled from 'styled-components';
import NavLevelDropdown from '../NavLevelDropdown';
import NavLink from '../NavLink';
import RestartButton from '../RestartButton';
import '../global.css';

const StyledUl = styled.ul`

  ${
    /* If a theme was provided, apply these basic styles. See README.md for an explanation of how the background color is computed. */ ''
  }
  ${({ theme, layout, level }) =>
    theme &&
    theme.background &&
    `
      display: flex;
      flex-direction: ${layout === 'wide' ? 'row' : 'column'};
      margin: 0;
      background-color: ${theme.background[level % theme.background.length]};
    `}

  ${
    /* Both 'visibility: hidden' and 'display: none' hide content from ALL users, including people using screen readers and other accessible technologies. The differences between them are: 1) 'visibility: hidden' is animatable, and 2) when you use 'visibility: hidden', the element is not there but the space it would occupy is reserved for it. When not animated, a simple 'display: none' does the trick. For animated transitions of any kind, we need to use 'visibility: hidden' as below. */ ''
  }

  ${({ expanded, animated }) => !animated && !expanded && 'display: none;'}

  ${({ expanded, animated }) =>
    animated &&
    (expanded
      ? `
      visibility: visible;
      opacity: 1;
      transition: opacity 0.6s ease-out, visibility 0s linear;
      `
      : `
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.6s ease-out, visibility 0s linear 0.5s;
      position: absolute !important;
      top: -9999px;
      left: -9999px;
    `)}

    ${
      /* If a theme was provided and the layout is tall, a new level appears nested inside of its parent */ ''
    }
    ${({ theme, layout }) =>
      theme &&
      theme.color &&
      layout &&
      layout == 'tall' &&
      `
      flex-direction: column;
      height: 100%;
      padding: 0.5em 1em;
      margin-top: 0.5em;
    `}

  ${
    /* If a theme was provided and the layout is wide, a new level appears underneath its parent. To know the correct vertical offset, we use the prevLevelHeight we got from the parent Dropdown component. */ ''
  }
  ${({ layout, prevLevelHeight }) =>
    layout &&
    layout == 'wide' &&
    `
      flex-direction: row;
      flex-wrap: wrap;
      position: absolute;
      right: 0;
      top: ${prevLevelHeight - 2}px;
      left: 0;
      padding: 0.75em 1.5em;
    `}

  ${
    /* Special styles for level 0, which has no parent Dropdown component. To-do: add the option to expand/collapse the top level from a button. */ ''
  }
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
  ${/* If a theme was provided, style the list items (which are the links in that level). */ ''}
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
  {
  }
  return (
    <StyledUl
      theme={theme}
      layout={layout}
      animated={animated}
      level={level}
      prevLevelHeight={prevLevelHeight}
      expanded={expanded}
      ref={currentLevelRef}
    >
      {data.map((item, index) => (
        <StyledLi theme={theme} layout={layout} key={item.id}>
          {item.children ? (
            <NavLevelDropdown
              data={item}
              theme={theme}
              layout={layout}
              animated={animated}
              level={level}
              currentLevelRef={currentLevelRef}
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
