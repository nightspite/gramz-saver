/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const url = `/.netlify/functions/getstories`;

function useGetStories() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  return posts;
}

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

export default function GetStories() {
  const gramz = useGetStories();

  return (
    <StyledWrapper>
      {gramz.map((gram) => (
        <StyledPostWrapper>
          {gram.sideImages ? (
            gram.sideImages.map((image) =>
              image.isVideo === true ? (
                <StyledImageWrapper>
                  <a href={image.video} key={gram.postId}>
                    <StyledImage src={image.thumbnail} alt={gram.postId} />
                  </a>
                  <a
                    href={`https://instagram.com/p/${gram.postShortcode}`}
                  >{`https://instagram.com/p/${gram.postShortcode}`}</a>
                </StyledImageWrapper>
              ) : (
                <StyledImageWrapper>
                  <a href={image.image} key={gram.postId}>
                    <StyledImage src={image.thumbnail} alt={gram.postId} />
                  </a>
                  <a
                    href={`https://instagram.com/p/${gram.postShortcode}`}
                  >{`https://instagram.com/p/${gram.postShortcode}`}</a>
                </StyledImageWrapper>
              ),
            )
          ) : gram.isVideo === true ? (
            <StyledImageWrapper>
              <a href={gram.video} key={gram.postId}>
                <StyledImage src={gram.thumbnail} alt={gram.postId} />
              </a>
              <a
                href={`https://instagram.com/p/${gram.postShortcode}`}
              >{`https://instagram.com/p/${gram.postShortcode}`}</a>
            </StyledImageWrapper>
          ) : (
            <StyledImageWrapper>
              <a href={gram.image} key={gram.postId}>
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
