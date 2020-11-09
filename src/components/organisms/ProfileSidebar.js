import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ProfileImage from 'components/molecules/ProfileImage';
import ProfileSummary from 'components/molecules/ProfileSummary';
import FollowButton from 'components/molecules/FollowButton';
import ProfileInfo from 'components/molecules/ProfileInfo';
import ProfileHighlights from 'components/molecules/ProfileHighlights';

const StyledProfileSidebar = styled.div`
  position: fixed;
  width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileSidebar = ({ profile }) => (
  <StyledProfileSidebar>
    <ProfileImage image={profile.thumbnail} alt={profile.userId} />

    <ProfileSummary
      posts={profile.numberOfPosts}
      followers={profile.followers}
      following={profile.following}
    />

    <FollowButton username={profile.username} />

    <ProfileInfo
      fullName={profile.fullName}
      bio={profile.bio}
      externalUrl={profile.externalUrl}
    />

    {profile.highlights > 0 && (
      <ProfileHighlights image={profile.thumbnail} alt={profile.userId} />
    )}

    {/* <p>username: {profile.username}</p> */}
    {/* <p>userid: {profile.userId}</p> */}
    {/* <GetPosts userId={profile.userId}/> */}
  </StyledProfileSidebar>
);

ProfileSidebar.propTypes = {
  profile: PropTypes.shape({
    thumbnail: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    numberOfPosts: PropTypes.number.isRequired,
    followers: PropTypes.number.isRequired,
    following: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    externalUrl: PropTypes.string.isRequired,
    highlights: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProfileSidebar;
