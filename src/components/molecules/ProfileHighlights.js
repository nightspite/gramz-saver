import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledHighlightsWrapper = styled.div`
  margin-top: 30px;
  width: 260px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const StyledHighlight = styled.div`
  /* margin-top: 10px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledHightlightImageWrapper = styled.div`
  width: 75px;
  height: 75px;
  border: 2px solid #e5e5e5;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledHighlightImage = styled.img`
  width: 65px;
  height: 65px;
  border-radius: 50%;
`;

const StyledHighlightTitle = styled.p`
  margin-top: 5px;
  color: #a0a0a0;
  font-size: 1.2rem;
`;

const ProfileHightlights = ({ image, alt }) => (
  <StyledHighlightsWrapper>
    <StyledHighlight>
      <StyledHightlightImageWrapper>
        <StyledHighlightImage src={image} alt={alt} />
      </StyledHightlightImageWrapper>
      <StyledHighlightTitle>value</StyledHighlightTitle>
    </StyledHighlight>
    <StyledHighlight>
      <StyledHightlightImageWrapper>
        <StyledHighlightImage src={image} alt={alt} />
      </StyledHightlightImageWrapper>
      <StyledHighlightTitle>value</StyledHighlightTitle>
    </StyledHighlight>
    <StyledHighlight>
      <StyledHightlightImageWrapper>
        <StyledHighlightImage src={image} alt={alt} />
      </StyledHightlightImageWrapper>
      <StyledHighlightTitle>value</StyledHighlightTitle>
    </StyledHighlight>
    <StyledHighlight>
      <StyledHightlightImageWrapper>
        <StyledHighlightImage src={image} alt={alt} />
      </StyledHightlightImageWrapper>
      <StyledHighlightTitle>value</StyledHighlightTitle>
    </StyledHighlight>
  </StyledHighlightsWrapper>
);

ProfileHightlights.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ProfileHightlights;
