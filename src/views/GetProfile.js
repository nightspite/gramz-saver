/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import NotFound from './NotFound';
import slimUpProfile from '../functions/slimUpProfile';

const StyledWrapper = styled.div``;

const StyledPostWrapper = styled.div``;

const StyledImageWrapper = styled.div`
  display: inline-block;
  width: 300px;
`;
const StyledImage = styled.img`
  width: 300px;
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
        <StyledImageWrapper>
          <a href={profile.image}>
            <StyledImage src={profile.thumbnail} alt={profile.postId} />
          </a>
          <a
            href={`https://instagram.com/${profile.username}`}
          >{`https://instagram.com/${profile.username}`}</a>
          <p>userid: {profile.userId}</p>
          <p>username: {profile.username}</p>
          <p>bio: {profile.bio}</p>
          <p>following: {profile.following}</p>
          <p>followers: {profile.followers}</p>
        </StyledImageWrapper>
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
