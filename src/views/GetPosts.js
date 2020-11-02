/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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

function slimUpPosts(response) {
  return response.data.user.edge_owner_to_timeline_media.edges.map((edge) =>
    edge.node.edge_sidecar_to_children
      ? {
          thumbnail: edge.node.thumbnail_src,
          isVideo: edge.node.is_video,
          video: edge.node.video_url,
          image: edge.node.display_url,
          postUrl: `https://instagram.com/p/${edge.node.shortcode}`,
          postId: edge.node.id,
          postShortcode: edge.node.shortcode,

          sideImages: edge.node.edge_sidecar_to_children.edges.map((edged) => ({
            thumbnail: edged.node.display_resources[0].src,
            isVideo: edged.node.is_video,
            video: edged.node.video_url,
            image: edged.node.display_url,
          })),
        }
      : {
          thumbnail: edge.node.thumbnail_src,
          isVideo: edge.node.is_video,
          video: edge.node.video_url,
          image: edge.node.display_url,
          postUrl: `https://instagram.com/p/${edge.node.shortcode}`,
          postId: edge.node.id,
          postShortcode: edge.node.shortcode,
        },
  );
}

function GetPosts() {
  const [errors, setErrors] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [gramz, setGramz] = useState([]);
  const [username] = useState('953293389');

  useEffect(() => {
    const url = `https://www.instagram.com/graphql/query/?query_hash=e769aa130647d2354c40ea6a439bfc08&variables={"id":"${username}","first":50}`;
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setGramz(slimUpPosts(result));
        },
        (error) => {
          setIsLoaded(true);
          setErrors(error);
        },
      );
  }, []);

  if (errors) {
    return <div>Error: {errors.message}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
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

export default GetPosts;
