import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import NotFound from 'components/NotFound';
import ProfileSidebar from 'components/organisms/ProfileSidebar';
import GetPosts from 'views/GetPosts';
import Loading from 'components/molecules/Loading';
import NavbarTemplate from 'templates/NavbarTemplate';

const StyledPostWrapper = styled.div`
  display: flex;
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
        `/.netlify/functions/getprofile?username=${username}`,
      ).then((response) =>
        response.status !== 200 ? setErrors(response.status) : response.json(),
      );

      setProfile(data);
      setIsLoaded(true);
    };

    fetchData();
  }, []);

  if (errors) {
    return <NotFound />;
  }
  if (!isLoaded) {
    return <Loading />;
  }

  if (profile.length === 0) {
    return <NotFound />;
  }
  return (
    <NavbarTemplate>
      <StyledPostWrapper>
        <ProfileSidebar profile={profile} />

        <GetPosts userId={profile.userId} />
      </StyledPostWrapper>
    </NavbarTemplate>
  );
}

GetProfile.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default GetProfile;
