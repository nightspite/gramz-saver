/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import slimUpPosts from '../functions/slimUpPosts';
import NotFound from './NotFound';

const StyledWrapper = styled.div``;

const StyledPostWrapper = styled.div``;

const StyledImageWrapper = styled.div`
  display: inline-block;
  width: 300px;
  height: 350px;
`;
const StyledImage = styled.img`
  width: 300px;
  background-size: cover;
`;

function GetPosts({ location }) {
  const [errors, setErrors] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [gramz, setGramz] = useState([]);
  const username = location.pathname.match(/[^/]*$/);

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
        const url = `https://www.instagram.com/graphql/query/?query_hash=e769aa130647d2354c40ea6a439bfc08&variables={"id":${data.graphql.user.id},"first":50}`;
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
              setGramz(slimUpPosts(result));
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
  if (gramz.length === 0) {
    return <NotFound />;
  }
  return (
    <StyledWrapper>
      {gramz.map((gram) => (
        <StyledPostWrapper key={gram.postId}>
          {gram.sideImages ? (
            gram.sideImages.map((image, key) =>
              image.isVideo === true ? (
                <StyledImageWrapper key={gram.postId + key.toString()}>
                  <a href={image.video}>
                    <StyledImage src={image.thumbnail} alt={gram.postId} />
                  </a>
                  <a
                    href={`https://instagram.com/p/${gram.postShortcode}`}
                  >{`https://instagram.com/p/${gram.postShortcode}`}</a>
                </StyledImageWrapper>
              ) : (
                <StyledImageWrapper key={gram.postId + key.toString()}>
                  <a href={image.image}>
                    <StyledImage src={image.thumbnail} alt={gram.postId} />
                  </a>
                  <a
                    href={`https://instagram.com/p/${gram.postShortcode}`}
                  >{`https://instagram.com/p/${gram.postShortcode}`}</a>
                </StyledImageWrapper>
              ),
            )
          ) : gram.isVideo === true ? (
            <StyledImageWrapper key={gram.postId}>
              <a href={gram.video}>
                <StyledImage src={gram.thumbnail} alt={gram.postId} />
              </a>
              <a
                href={`https://instagram.com/p/${gram.postShortcode}`}
              >{`https://instagram.com/p/${gram.postShortcode}`}</a>
            </StyledImageWrapper>
          ) : (
            <StyledImageWrapper key={gram.postId}>
              <a href={gram.image}>
                <StyledImage src={gram.thumbnail} alt={gram.postId} />
              </a>
              <a
                href={`https://instagram.com/p/${gram.postShortcode}`}
              >{`https://instagram.com/p/${gram.postShortcode}`}</a>
            </StyledImageWrapper>
          )}
        </StyledPostWrapper>
      ))}
    </StyledWrapper>
  );
}

GetPosts.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default GetPosts;
