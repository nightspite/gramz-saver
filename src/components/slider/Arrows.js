import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import leftArrow from 'assets/leftArrow.svg';
import rightArrow from 'assets/rightArrow.svg';

const StyledLeftButton = styled.button`
  border: none;
  padding: 0;
  width: 30px;
  z-index: 1;
  background: none;
  cursor: pointer;
  outline: none;
  margin-right: 40px;
`;

const StyledRightButton = styled.button`
  border: none;
  padding: 0;
  width: 30px;
  z-index: 1;
  background: none;
  cursor: pointer;
  outline: none;
  margin-left: 40px;
`;

export const LeftButton = ({ handlePrev, index }) => (
  <StyledLeftButton
    onClick={handlePrev}
    style={{ visibility: index === 0 ? 'hidden' : 'visible' }}
  >
    <img src={leftArrow} alt="prev" />
  </StyledLeftButton>
);

export const RightButton = ({ handleNext, end, index }) => (
  <StyledRightButton
    onClick={handleNext}
    style={{
      visibility: index === end ? 'hidden' : 'visible',
    }}
  >
    <img src={rightArrow} alt="next" />
  </StyledRightButton>
);

LeftButton.propTypes = {
  handlePrev: PropTypes.func.isRequired,
  index: PropTypes.number,
};

LeftButton.defaultProps = {
  index: 0,
};

RightButton.propTypes = {
  handleNext: PropTypes.func.isRequired,
  end: PropTypes.number,
  index: PropTypes.number,
};

RightButton.defaultProps = {
  index: 0,
  end: 0,
};
