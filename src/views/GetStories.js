import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import NotFound from 'components/NotFound';
import Loading from 'components/molecules/Loading';
import NavbarTemplate from 'templates/NavbarTemplate';

const StyledWrapper = styled.div``;

const StyledPostWrapper = styled.div`
  margin-left: 50%;
  transform: translateX(-50%);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const StyledImageWrapper = styled.div`
  display: inline-block;
  width: 300px;
  margin-top: 15px;
`;

const StyledImage = styled.img`
  width: 300px;
`;

function GetStories({ location }) {
  const [errors, setErrors] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [stories, setStories] = useState([]);
  const userId = location.pathname
    .split('/')
    .filter((e) => e)
    .pop();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `/.netlify/functions/getstories?userId=${userId}`,
      ).then((response) =>
        response.status !== 200 ? setErrors(response.status) : response.json(),
      );

      setStories(data);
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

  if (stories.length === 0) {
    return <NotFound />;
  }

  return (
    <NavbarTemplate>
      <StyledWrapper>
        <StyledPostWrapper>
          {stories.items.map((story) =>
            story.isVideo === true ? (
              <StyledImageWrapper key={story.storyId}>
                <a href={story.video}>
                  <StyledImage src={story.thumbnail} alt={story.storyId} />
                </a>
              </StyledImageWrapper>
            ) : (
              <StyledImageWrapper key={story.storyId}>
                <a href={story.image}>
                  <StyledImage src={story.thumbnail} alt={story.storyId} />
                </a>
              </StyledImageWrapper>
            ),
          )}

          {/* <a
            href={`https://instagram.com/${stories.username}`}
          >{`https://instagram.com/${stories.username}`}</a> */}
        </StyledPostWrapper>
      </StyledWrapper>
    </NavbarTemplate>
  );
}

GetStories.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default GetStories;
