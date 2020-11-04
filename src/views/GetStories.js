/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import slimUpStories from '../functions/slimUpStories';
// import NotFound from './NotFound';

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
  const username = location.pathname
    .split('/')
    .filter((e) => e)
    .pop();

  useEffect(() => {
    fetch(`https://instagram.com/${username}/?__a=1`)
      .then((res) =>
        res.status !== 200
          ? console.log(
              `Looks like there was a problem. Status Code: ${res.status}`,
            )
          : res.json(),
      )
      .then((data) => {
        const url = `/.netlify/functions/getstories/${data.graphql.user.id}`;
        fetch(url)
          .then((res) =>
            res.status !== 200
              ? console.log(
                  `Looks like there was a problem. Status Code: ${res.status}`,
                )
              : res.json(),
          )
          .then(
            (result) => {
              setIsLoaded(true);
              setStories(slimUpStories(result));
            },
            (error) => {
              setIsLoaded(true);
              setErrors(error);
              console.log(error);
            },
          );
      })
      .then((error) => {
        setIsLoaded(true);
        setErrors(error);
        console.log(error);
      });
  }, []);

  if (errors) {
    return <div>Error: {errors.message}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  // if (gramz.length === 0) {
  //   return <NotFound />;
  // }
  return (
    <StyledWrapper>
      <StyledPostWrapper>
        {stories.items.isVideo === true ? (
          <StyledImageWrapper key={stories.items.storyId}>
            <a href={stories.items.video}>
              <StyledImage
                src={stories.items.thumbnail}
                alt={stories.items.storyId}
              />
            </a>
            <a
              href={`https://instagram.com/${stories.username}`}
            >{`https://instagram.com/${stories.username}`}</a>
          </StyledImageWrapper>
        ) : (
          <StyledImageWrapper key={stories.items.storyId}>
            <a href={stories.items.image}>
              <StyledImage
                src={stories.items.thumbnail}
                alt={stories.items.storyId}
              />
            </a>
            <a
              href={`https://instagram.com/${stories.username}`}
            >{`https://instagram.com/${stories.username}`}</a>
          </StyledImageWrapper>
        )}
      </StyledPostWrapper>
      {/* {stories} */}
    </StyledWrapper>
  );
}

GetStories.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default GetStories;
