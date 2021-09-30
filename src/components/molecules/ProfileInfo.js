import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledProfileInfo = styled.div`
  margin-top: 30px;
  width: 260px;
`;

const StylefProfileName = styled.h1`
  font-size: 1.4rem;
  font-weight: 600;
`;

const StyledBio = styled.p`
  font-size: 1.4rem;
`;

const StyledExternalUrl = styled.a`
  text-decoration: none;
  color: #208cee;
  word-break: break-all;
`;

const FollowButton = ({ fullName, bio, externalUrl }) => (
  <StyledProfileInfo>
    <StylefProfileName>{fullName}</StylefProfileName>
    <StyledBio>{bio}</StyledBio>
    {externalUrl && (
      <StyledExternalUrl href={externalUrl}>{externalUrl}</StyledExternalUrl>
    )}
  </StyledProfileInfo>
);

FollowButton.propTypes = {
  fullName: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  externalUrl: PropTypes.string,
};

FollowButton.defaultProps = {
  externalUrl: '',
};

export default FollowButton;
