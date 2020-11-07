import React from 'react';
import styled from 'styled-components';

const StyledLoading = styled.div`
  animation-duration: 1000ms;
  position: absolute;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  overflow: hidden;
`;

const StyledLoadingSvg = styled.svg`
  fill: none;
  stroke: #8a3ab8;
  stroke-width: 2px;
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: loading 1000ms ease-in-out infinite alternate;

  @keyframes loading {
    100% {
      stroke: #cd476b;
      stroke-dasharray: 5;
      transform: rotate(200deg);
    }
  }
`;

const Loading = () => (
  <StyledLoading>
    <StyledLoadingSvg viewBox="0 0 70 70">
      <circle cx="35" cy="35" r="30" />
    </StyledLoadingSvg>
  </StyledLoading>
);

export default Loading;
