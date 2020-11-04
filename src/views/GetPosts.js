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
`;
const StyledImage = styled.img`
  width: 300px;
`;

function GetPosts({ location }) {
  const [errors, setErrors] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [gramz, setGramz] = useState([]);
  const username = location.pathname
    .split('/')
    .filter((e) => e)
    .pop();

  useEffect(() => {
    const fetchData = async () => {
      const user = await fetch(
        `https://instagram.com/${username}/?__a=1`,
      ).then((response) =>
        response.status !== 200 ? setErrors(response.status) : response.json(),
      );

      const userId = user.graphql.user.id;

      const posts = await fetch(
        `https://www.instagram.com/graphql/query/?query_hash=e769aa130647d2354c40ea6a439bfc08&variables={"id":${userId},"first":50}`,
      ).then((response) =>
        response.status !== 200 ? setErrors(response.status) : response.json(),
      );

      setGramz(slimUpPosts(posts));
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
