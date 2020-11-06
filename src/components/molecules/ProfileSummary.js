import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledProfileSummary = styled.div`
  margin-top: 20px;
  width: 260px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const StyledFollowers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledFollowersNumbers = styled.p`
  margin-bottom: 0;
  font-size: 1.6rem;
  font-weight: 600;
`;

const StyledFollowersDescription = styled.p`
  margin-top: 0;
  color: #a0a0a0;
  font-size: 1.2rem;
`;

const ProfileSummary = ({ posts, followers, following }) => (
  <StyledProfileSummary>
    <StyledFollowers>
      <StyledFollowersNumbers>{posts}</StyledFollowersNumbers>
      <StyledFollowersDescription>posts</StyledFollowersDescription>
    </StyledFollowers>
    <StyledFollowers>
      <StyledFollowersNumbers>{followers}</StyledFollowersNumbers>
      <StyledFollowersDescription>followers</StyledFollowersDescription>
    </StyledFollowers>
    <StyledFollowers>
      <StyledFollowersNumbers>{following}</StyledFollowersNumbers>
      <StyledFollowersDescription>following</StyledFollowersDescription>
    </StyledFollowers>
  </StyledProfileSummary>
);

ProfileSummary.propTypes = {
  posts: PropTypes.string.isRequired,
  followers: PropTypes.string.isRequired,
  following: PropTypes.string.isRequired,
};

export default ProfileSummary;
