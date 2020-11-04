/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import slimUpPost from '../functions/slimUpPost';
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

function GetPost({ location }) {
  const [errors, setErrors] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [gramz, setGramz] = useState([]);
  const shortcode = location.pathname
    .split('/')
    .filter((e) => e)
    .pop();

  useEffect(() => {
    const url = `https://www.instagram.com/p/${shortcode}/?__a=1`;
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
          setGramz(slimUpPost(result));
        },
        (error) => {
          setIsLoaded(true);
          setErrors(error);
          console.log(error);
        },
      );
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const post = await fetch(
        `https://www.instagram.com/p/${shortcode}/?__a=1`,
      ).then((response) =>
        response.status !== 200 ? setErrors(response.status) : response.json(),
      );

      setGramz(slimUpPost(post));
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
      <StyledPostWrapper key={gramz.postId}>
        {gramz.sideImages ? (
          gramz.sideImages.map((image, key) =>
            image.isVideo === true ? (
              <StyledImageWrapper key={gramz.postId + key.toString()}>
                <a href={image.video}>
                  <StyledImage src={image.thumbnail} alt={gramz.postId} />
                </a>
                <a
                  href={`https://instagram.com/p/${gramz.postShortcode}`}
                >{`https://instagram.com/p/${gramz.postShortcode}`}</a>
              </StyledImageWrapper>
            ) : (
              <StyledImageWrapper key={gramz.postId + key.toString()}>
                <a href={image.image}>
                  <StyledImage src={image.thumbnail} alt={gramz.postId} />
                </a>
                <a
                  href={`https://instagram.com/p/${gramz.postShortcode}`}
                >{`https://instagram.com/p/${gramz.postShortcode}`}</a>
              </StyledImageWrapper>
            ),
          )
        ) : gramz.isVideo === true ? (
          <StyledImageWrapper key={gramz.postId}>
            <a href={gramz.video}>
              <StyledImage src={gramz.thumbnail} alt={gramz.postId} />
            </a>
            <a
              href={`https://instagram.com/p/${gramz.postShortcode}`}
            >{`https://instagram.com/p/${gramz.postShortcode}`}</a>
          </StyledImageWrapper>
        ) : (
          <StyledImageWrapper key={gramz.postId}>
            <a href={gramz.image}>
              <StyledImage src={gramz.thumbnail} alt={gramz.postId} />
            </a>
            <a
              href={`https://instagram.com/p/${gramz.postShortcode}`}
            >{`https://instagram.com/p/${gramz.postShortcode}`}</a>
          </StyledImageWrapper>
        )}
      </StyledPostWrapper>
    </StyledWrapper>
  );
}

GetPost.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default GetPost;
