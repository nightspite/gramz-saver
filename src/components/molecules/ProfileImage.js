import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { routes } from 'routes';
import { Link } from 'react-router-dom';

const StyledStory = styled.div`
  width: 100px;
  height: 100px;
  overflow: hidden;
`;

const StoryImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-left: 50%;
  margin-top: 0;
  transform: translate(-50%, -94px);
`;

const StorySvg = styled.svg`
  fill: none;
  stroke: #8a3ab8;
  stroke-width: 3px;
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: loading 4500ms ease-in-out infinite alternate;

  @keyframes loading {
    100% {
      stroke: #cd476b;
      stroke-dasharray: 10;
      transform: rotate(200deg);
    }
  }
`;

const ProfileImage = ({ image, user }) => (
  <StyledStory>
    {/* <a href={profile.image}> */}
    <Link to={routes.stories + user}>
      <StorySvg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" />
      </StorySvg>
      <StoryImage src={image} alt={user} />
    </Link>
    {/* </a> */}
  </StyledStory>
);

ProfileImage.propTypes = {
  image: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

export default ProfileImage;
