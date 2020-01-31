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

const RestartButton = ({ prevButtonRef }) => {
  const restartLevel = () => {
    prevButtonRef && prevButtonRef.current && prevButtonRef.current.focus();
  };

  return <StyledButton onFocus={restartLevel}>Restart this level</StyledButton>;
};

export default RestartButton;
