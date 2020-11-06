/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import slimUpProfile from 'functions/slimUpProfile';
import NotFound from 'components/NotFound';
import ProfileImage from 'components/molecules/ProfileImage';
import ProfileSummary from 'components/molecules/ProfileSummary';
import FollowButton from 'components/molecules/FollowButton';
import ProfileInfo from 'components/molecules/ProfileInfo';
import ProfileHighlights from 'components/molecules/ProfileHighlights';
import GetPosts from 'views/GetPosts';

const StyledWrapper = styled.div``;

const StyledPostWrapper = styled.div`
  display: flex;
`;

const StyledProfileSidebar = styled.div`
  margin-top: 50px;
  width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function GetProfile({ location }) {
  const [errors, setErrors] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [profile, setProfile] = useState([]);
  const username = location.pathname
    .split('/')
    .filter((e) => e)
    .pop();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://instagram.com/${username}/?__a=1`,
      ).then((response) =>
        response.status !== 200 ? setErrors(response.status) : response.json(),
      );

      setProfile(slimUpProfile(data));
      setIsLoaded(true);
    };

    fetchData();
  }, []);

  if (errors) {
    return <NotFound />;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (profile.length === 0) {
    return <NotFound />;
  }
  return (
    <StyledWrapper>
      <StyledPostWrapper>
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

        <GetPosts userId={profile.userId} />
      </StyledPostWrapper>
    </StyledWrapper>
  );
}

GetProfile.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default GetProfile;
