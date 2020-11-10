/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import NotFound from 'components/NotFound';
import Loading from 'components/molecules/Loading';

const StyledWrapper = styled.div``;

const StyledPostWrapper = styled.div``;

const StyledImageWrapper = styled.div`
  display: inline-block;
  width: 300px;
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
        `/.netlify/functions/getstories?user=${userId}`,
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

        <a
          href={`https://instagram.com/${stories.username}`}
        >{`https://instagram.com/${stories.username}`}</a>
      </StyledPostWrapper>
    </StyledWrapper>
  );
}

GetStories.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default GetStories;
