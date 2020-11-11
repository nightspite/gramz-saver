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

function GetHighlights({ location }) {
  const [errors, setErrors] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hightlights, setHightlights] = useState([]);
  const highlightId = location.pathname
    .split('/')
    .filter((e) => e)
    .pop();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `/.netlify/functions/gethightlights?hightlight=${highlightId}`,
      ).then((response) =>
        response.status !== 200 ? setErrors(response.status) : response.json(),
      );

      setHightlights(data);
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

  if (hightlights.length === 0) {
    return <NotFound />;
  }

  return (
    <StyledWrapper>
      <StyledPostWrapper>
        {hightlights.items.map((hightlight) =>
          hightlight.isVideo === true ? (
            <StyledImageWrapper key={hightlight.storyId}>
              <a href={hightlight.video}>
                <StyledImage
                  src={hightlight.thumbnail}
                  alt={hightlight.storyId}
                />
              </a>
            </StyledImageWrapper>
          ) : (
            <StyledImageWrapper key={hightlight.storyId}>
              <a href={hightlight.image}>
                <StyledImage
                  src={hightlight.thumbnail}
                  alt={hightlight.storyId}
                />
              </a>
            </StyledImageWrapper>
          ),
        )}

        <a
          href={`https://instagram.com/${hightlights.username}`}
        >{`https://instagram.com/${hightlights.username}`}</a>
      </StyledPostWrapper>
    </StyledWrapper>
  );
}

GetHighlights.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default GetHighlights;
