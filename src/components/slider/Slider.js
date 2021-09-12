import React, { useState } from 'react';
import styled from 'styled-components';
import { LeftButton, RightButton } from 'components/slider/Arrows';
import PropTypes from 'prop-types';

const PostContainter = styled.div`
  display: flex;
  justify-content: center;
`;

const PostWrapper = styled.div`
  height: ${(props) => props.postHeight}px;
  max-height: 700px;
  display: flex;
  justify-content: center;
`;

const imageWrapper = {
  display: 'flex',
  flexDirection: 'column',
};

const StyledImageLinks = styled.div`
  margin-top: -39px;
  display: flex;
  background-color: rgba(255, 255, 255, 0.9);
`;

const StyledLink = styled.a`
  padding: 10px;
  width: 50%;
  text-align: center;
  text-decoration: none;
  color: #000;
  font-weight: 600;
`;

const Slider = ({ gramz }) => {
  const [slideIndex, setSlide] = useState(0);

  const handlePrev = () => setSlide((prevIndex) => prevIndex - 1);

  const handleNext = () => setSlide((prevIndex) => prevIndex + 1);

  if (gramz.sideImages) {
    return (
      <PostContainter>
        <PostWrapper
          postWidth={gramz.sideImages[slideIndex].width}
          postHeight={gramz.sideImages[slideIndex].height}
        >
          <LeftButton handlePrev={handlePrev} index={slideIndex} />

          {gramz.sideImages[slideIndex].isVideo === true ? (
            <div style={imageWrapper}>
              <img
                src={gramz.sideImages[slideIndex].thumbnail}
                alt={gramz.postId}
              />
              <StyledImageLinks>
                <StyledLink href={gramz.sideImages[slideIndex].video}>
                  Download
                </StyledLink>
                <StyledLink href={gramz.postUrl}>Open instagram</StyledLink>
              </StyledImageLinks>
            </div>
          ) : (
            <div style={imageWrapper}>
              <img
                src={gramz.sideImages[slideIndex].thumbnail}
                alt={gramz.postId}
              />
              <StyledImageLinks>
                <StyledLink href={gramz.sideImages[slideIndex].image}>
                  Download
                </StyledLink>
                <StyledLink href={gramz.postUrl}>Open instagram</StyledLink>
              </StyledImageLinks>
            </div>
          )}

          <RightButton
            handleNext={handleNext}
            end={gramz.sideImages.length - 1}
            index={slideIndex}
          />
        </PostWrapper>
      </PostContainter>
    );
  }

  if (gramz.isVideo) {
    return (
      <PostContainter>
        <PostWrapper>
          <div style={imageWrapper}>
            <img src={gramz.thumbnail} alt={gramz.postId} />
            <StyledImageLinks>
              <StyledLink href={gramz.video}>Download</StyledLink>
              <StyledLink href={gramz.postUrl}>Open instagram</StyledLink>
            </StyledImageLinks>
          </div>
        </PostWrapper>
      </PostContainter>
    );
  }

  return (
    <PostContainter>
      <PostWrapper>
        <div style={imageWrapper}>
          <img src={gramz.thumbnail} alt={gramz.postId} />
          <StyledImageLinks>
            <StyledLink href={gramz.image}>Download</StyledLink>
            <StyledLink href={gramz.postUrl}>Open instagram</StyledLink>
          </StyledImageLinks>
        </div>
      </PostWrapper>
    </PostContainter>
  );
};

Slider.propTypes = {
  gramz: PropTypes.shape({
    sideImages: PropTypes.arrayOf(PropTypes.string),
    postId: PropTypes.string,
    thumbnail: PropTypes.string,
    image: PropTypes.string,
    postUrl: PropTypes.string,
    isVideo: PropTypes.bool,
    video: PropTypes.string,
  }),
};

Slider.defaultProps = {
  gramz: {},
};

export default Slider;
