import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import NavLevel from '../NavLevel';
import NavLink from '../NavLink';
import RestartButton from '../RestartButton';
import '../../global.css';

const StyledButton = styled.button`

  ${({ theme }) =>
    theme &&
    `
      padding: 0;
      margin-left: 0.3em;
      height: 1.2em;
      width: 1.2em;
      border: none;
    `}

  ${({ theme, level }) =>
    theme &&
    theme.color &&
    theme.background &&
    `
    border: 2px solid
      ${theme.background && theme.background[level % theme.background.length]};
    &:hover, &:focus {
      border: 2px solid
        ${theme.color && theme.color[level % theme.color.length]};
    }
  `}

  ${({ pressed, theme, level }) =>
    theme &&
    theme.color &&
    theme.background &&
    (!pressed
      ? `
          color: ${theme.color[level % theme.color.length]}};
          background-color: ${
            theme.background[level % theme.background.length]
          };
        `
      : `
          color: ${theme.background[level % theme.background.length]};
          background-color: ${theme.color[level % theme.color.length]};
        `)}
      
`;

const StyledI = styled.i`
  ${({ theme }) =>
    theme &&
    `
      font-size: 0.5em;
      display: block;
    `}
`;

const NavDropdown = ({
  data,
  layout,
  theme,
  level,
  previousLevelRef,
  prevButtonRef,
}) => {
  const [pressed, setPressed] = useState(false);
  const [prevLevelHeight, setPrevLevelHeight] = useState(0);
  const handleClick = () => {
    setPressed(!pressed);
    setPrevLevelHeight(previousLevelRef.current.offsetHeight);
  };
  const currentButtonRef = useRef(null);

  return (
    <div>
      <div>
        <NavLink data={data} layout={layout} theme={theme} level={level} />
        <StyledButton
          type="button"
          onClick={handleClick}
          aria-pressed={pressed}
          aria-label={pressed ? `Collapse ${data.text}` : `Expand ${data.text}`}
          pressed={pressed}
          theme={theme}
          level={level}
          ref={currentButtonRef}
        >
          <StyledI
            className={pressed ? 'fas fa-chevron-up' : 'fas fa-chevron-down'}
            pressed={pressed}
            aria-hidden
            theme={theme}
            level={level}
          ></StyledI>
        </StyledButton>
      </div>
      {prevButtonRef && !pressed && (
        <RestartButton prevButtonRef={prevButtonRef}>
          Restart this level
        </RestartButton>
      )}

      <NavLevel
        data={data.children}
        layout={layout}
        theme={theme}
        level={level + 1}
        prevLevelHeight={prevLevelHeight}
        expanded={pressed}
        prevButtonRef={currentButtonRef}
      />
    </div>
  );
};

export default NavDropdown;
