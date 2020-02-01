import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
  clip: rect(1px, 1px, 1px, 1px);
`;

/* This component is rendered after the last interactive element on each level. When it receives focus, it immediatly switches focus to the toggle button in the previous level that expands/collapses the current level. */
const RestartButton = ({ prevButtonRef }) => {
  const restartLevel = () => {
    prevButtonRef && prevButtonRef.current && prevButtonRef.current.focus();
  };

  return <StyledButton onFocus={restartLevel} />;
};

export default RestartButton;
