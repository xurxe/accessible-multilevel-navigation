import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import NavLevel from '../NavLevel';
import NavLink from '../NavLink';
import RestartButton from '../RestartButton';
import '../../global.css';

const StyledDiv = styled.div`
  ${({ theme }) =>
    theme &&
    theme.color &&
    `display: flex;
    align-items: center;`}
`;

const StyledButton = styled.button`
  ${({ theme, level }) =>
    theme &&
    theme.color &&
    theme.background &&
    `
    padding: 0;
    margin-left: 0.3em;
    height: 1.2em;
    width: 1.2em;
    border: 2px solid
      ${theme.background[level % theme.background.length]};
    &:hover, &:focus {
      border: 2px solid
        ${theme.color[level % theme.color.length]};
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
  const currentDropdownRef = useRef(null);
  const currentButtonRef = useRef(null);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
  }, []);

  const handleOutsideClick = e => {
    if (!currentDropdownRef.current.contains(e.target)) {
      setPressed(false);
    }
  };

  return (
    <div ref={currentDropdownRef}>
      <StyledDiv theme={theme}>
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
      </StyledDiv>
      {prevButtonRef && !pressed && (
        <RestartButton prevButtonRef={prevButtonRef}>
          Restart this level
        </RestartButton>
      )}
      {pressed && (
        <NavLevel
          data={data.children}
          layout={layout}
          theme={theme}
          level={level + 1}
          prevLevelHeight={prevLevelHeight}
          prevButtonRef={currentButtonRef}
        />
      )}
    </div>
  );
};

export default NavDropdown;
