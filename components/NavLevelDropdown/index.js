import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import NavLevel from '../NavLevel';
import NavLink from '../NavLink';
import RestartButton from '../RestartButton';
import '../global.css';

const StyledDiv = styled.div`
  ${/* If a theme is provided and the nav is not animated, this aligns the link and button properly */ ''}
  ${({ theme, animated }) =>
    theme &&
    theme.color &&
    !animated &&
    `display: flex;
    align-items: center;`}
`;

const StyledButton = styled.button`
${/* If a theme is provided, these are the basic styles for the button */ ''}
  ${({ theme }) =>
    theme &&
    theme.color &&
    `
    padding: 0;
    margin-left: 0.3em;
    height: 1.3em;
    width: 1.3em;
    }
  `}

  ${
    /* If a theme is provided and the nav is not animated, the button has a simple change in text and/or background and/or border color*/ ''
  }
  ${({ theme, level, animated, pressed }) =>
    theme &&
    theme.color &&
    theme.background &&
    !animated &&
    `
    color: ${
      !pressed
        ? theme.color[level % theme.color.length]
        : theme.background[level % theme.background.length]
    };
    background-color: ${
      !pressed
        ? theme.background[level % theme.background.length]
        : theme.color[level % theme.color.length]
    };
    border-width: 2px;
    border-style: solid;
    border-color:
      ${theme.background[level % theme.background.length]};
    &:hover, &:focus {
      border-color:
        ${theme.color[level % theme.color.length]};
      color: ${
        !pressed
          ? theme.color[level % theme.color.length]
          : theme.background[level % theme.background.length]
      };
      background-color: ${
        !pressed
          ? theme.background[level % theme.background.length]
          : theme.color[level % theme.color.length]
      };
    }
    &:hover:focus {
      border-color:
        ${theme.color[level % theme.color.length]};
      background-color: ${
        !pressed
          ? theme.color[level % theme.color.length]
          : theme.background[level % theme.background.length]
      };
      color: ${
        !pressed
          ? theme.background[level % theme.background.length]
          : theme.color[level % theme.color.length]
      };
    }
  `}
        
  ${
    /* If a theme is provided and the nav is not animated, I used some code adapted from hover.css */ ''
  }
  ${({ theme, level, pressed, animated }) =>
    theme &&
    theme.accent &&
    theme.color &&
    animated &&
    `
      color: ${
        !pressed
          ? theme.color[level % theme.color.length]
          : theme.background[level % theme.background.length]
      };
      background-color: ${
        !pressed
          ? theme.background[level % theme.background.length]
          : theme.color[level % theme.color.length]
      };
      border: none;
      display: inline-block;
      vertical-align: middle;
      transform: perspective(1px) translateZ(0);
      box-shadow: 0 0 1px rgba(0, 0, 0, 0);
      color: ${
        !pressed
          ? theme.color[level % theme.color.length]
          : theme.background[level % theme.background.length]
      };
      transition-property: color background-color;
      transition-duration: 0.5s;
      transition-timing-function: ease-out;
      &:hover {
        color: ${
          !pressed
            ? theme.background[level % theme.background.length]
            : theme.color[level % theme.color.length]
        };
        background-color: ${
          !pressed
            ? theme.color[level % theme.color.length]
            : theme.background[level % theme.background.length]
        };
      }
      &:focus {
        color: ${theme.background[level % theme.background.length]};
        background-color: ${theme.color[level % theme.color.length]};
      }

      &:after {
        content: '';
        position: absolute;
        z-index: -1;
        left: 2px;
        right: 2px;
        top: 2px;
        bottom: 2px;
        border-style: solid;
        border-width: 2.5px;
        border-color: ${theme.background[level % theme.background.length]};
        opacity: 0;
        transition-property: opacity boder-color;
        transition-duration: 0.5s;
        transition-timing-function: ease-out;
      }

      &:hover:after {
        border-color: ${theme.color[level % theme.color.length]};
      }

      &:focus:after {
        opacity: 1;
      }
    `}
`;

const StyledI = styled.i`
  ${/* If a theme, these are the basic styles for the icon */ ''}
  ${({ theme }) =>
    theme &&
    theme.color &&
    `
      font-size: 0.5em;
      display: block;
    `}
`;

const NavLevelDropdown = props => {
  const {
    data,
    layout,
    theme,
    animated,
    level,
    currentLevelRef,
    ...rest
  } = props;
  /* We use the state to store whether the button has been pressed or not. The pressed prop has several functions, and it's: 1) passed to styled components for styling purposes: 2) used to set aria-pressed on the button; 3) used to toggle the aria-label for the button; 4) used to toggle aria-expanded for the next level; 5) passed to the next level to toggle visibility in the styles over there: */
  const [pressed, setPressed] = useState(false);

  /* We also use the state to store the height of the previous level, which we can access thanks to the previousLevelRef we got as a prop: */
  const [currentLevelHeight, setCurrentLevelHeight] = useState(0);

  /* We create a reference to this current dropdown component, which we need for the handleOutsideClick and handleBlur functions below: */
  const currentDropdownRef = useRef(null);

  /* We create a reference to the link in this current dropdown component, which we need for the handleBlur function below: */
  const currentLinkRef = useRef(null);

  /* We create a reference to the toggle button on this level, which we pass to the next level. Over there it will be passed to the RestartButton, which we put after the last element. Thanks to this button, focus is returned to the toggle button in this level, which the user can use to close the next level, or go through it again: */
  const currentButtonRef = useRef(null);

  /* When the button is clicked, the pressed state is toggled, and we get the height of the current level, which we pass to the next level to position it correctly: */
  const handleClick = () => {
    setPressed(!pressed);
    setCurrentLevelHeight(currentLevelRef.current.offsetHeight);
  };

  /* I put this function here because adding the onClick function makes the button work with Space and Enter, but I'm not sure yet if that's a Storybook-specific thing or what: */
  const handleKeyPress = event => {
    if (event.key === 32) {
      setPressed(!pressed);
      setCurrentLevelHeight(currentLevelRef.current.offsetHeight);
    }
  };

  /* When the window is resized, we measure the current level height again, since it might change: */
  const handleResize = () => {
    setCurrentLevelHeight(currentLevelRef.current.offsetHeight);
  };

  /* When the user clicks outside the current level or any of its children, these levels close: */
  const handleOutsideClick = event => {
    if (
      currentDropdownRef.current &&
      !currentDropdownRef.current.contains(event.target)
    ) {
      setPressed(false);
    }
  };

  /* TODO: refactor and comment */
  const handleBlur = () => {
    setTimeout(() => {
      if (
        (currentDropdownRef.current &&
          !currentDropdownRef.current.contains(document.activeElement)) ||
        currentLinkRef.current.contains(document.activeElement)
      ) {
        setPressed(false);
      }
    }, 100);
  };

  /* Use this to add these event listeners on mount: */
  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={currentDropdownRef}>
      <StyledDiv theme={theme} animated={animated}>
        <NavLink
          data={data}
          layout={layout}
          theme={theme}
          animated={animated}
          level={level}
          ref={currentLinkRef}
          {...rest}
        />
        <StyledButton
          theme={theme}
          animated={animated}
          level={level}
          ref={currentButtonRef}
          type="button"
          onClick={handleClick}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          pressed={pressed}
          aria-pressed={pressed}
          aria-expanded={pressed}
          aria-labelledby={data.id}
          {...rest}
        >
          <StyledI
            theme={theme}
            level={level}
            className={pressed ? 'fas fa-chevron-up' : 'fas fa-chevron-down'}
            pressed={pressed}
            aria-hidden={true}
            {...rest}
          ></StyledI>
          <span id={data.id} className="visually-hidden">
            {!pressed
              ? `Show ${data.text} submenu`
              : `Hide ${data.text} submenu`}
          </span>
        </StyledButton>
      </StyledDiv>

      <NavLevel
        data={data.children}
        theme={theme}
        layout={layout}
        animated={animated}
        expanded={pressed}
        aria-expanded={pressed}
        level={level + 1}
        prevLevelHeight={currentLevelHeight}
        prevButtonRef={currentButtonRef}
      />
    </div>
  );
};

export default NavLevelDropdown;
