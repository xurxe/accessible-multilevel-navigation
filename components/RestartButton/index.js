import React from 'react';

/* This component is rendered after the last interactive element on each level. When it receives focus, it immediatly switches focus to the toggle button in the previous level that expands/collapses the current level: */
const RestartButton = ({ prevButtonRef }) => {
  const restartLevel = () => {
    prevButtonRef && prevButtonRef.current && prevButtonRef.current.focus();
  };

  return (
    <button onFocus={restartLevel} className="visually-hidden">
      To hear this submenu from the beginning, press Tab or the equivalent key
      sequence for your browser. To close this submenu, activate the button.
    </button>
  );
};

export default RestartButton;
