/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import NotFound from '../components/NotFound';

const StyledWrapper = styled.div`
  width: calc(100vw - 420px);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const StyledPostWrapper = styled.div`
  margin-top: 50px;
`;

const StyledImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  /* width: 300px; */
`;
const StyledImage = styled.img`
  width: 300px;
`;

function GetPosts({ userId }) {
  const [errors, setErrors] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [gramz, setGramz] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `/.netlify/functions/getposts?user=${userId}`,
      ).then((response) =>
        response.status !== 200 ? setErrors(response.status) : response.json(),
      );

      setGramz(data);
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
          {
            // gram.sideImages ? (
            //   gram.sideImages.map((image, key) =>
            //     image.isVideo === true ? (
            //       <StyledImageWrapper key={gram.postId + key.toString()}>
            //         <a href={image.video}>
            //           <StyledImage src={image.thumbnail} alt={gram.postId} />
            //         </a>
            //         <a
            //           href={`https://instagram.com/p/${gram.postShortcode}`}
            //         >{`https://instagram.com/p/${gram.postShortcode}`}</a>
            //       </StyledImageWrapper>
            //     ) : (
            //       <StyledImageWrapper key={gram.postId + key.toString()}>
            //         <a href={image.image}>
            //           <StyledImage src={image.thumbnail} alt={gram.postId} />
            //         </a>
            //         <a
            //           href={`https://instagram.com/p/${gram.postShortcode}`}
            //         >{`https://instagram.com/p/${gram.postShortcode}`}</a>
            //       </StyledImageWrapper>
            //     ),
            //   )
            // ) :

            gram.isVideo === true ? (
              <StyledImageWrapper key={gram.postId}>
                <a href={gram.video}>
                  <StyledImage src={gram.thumbnail} alt={gram.postId} />
                </a>
              </StyledImageWrapper>
            ) : (
              <StyledImageWrapper key={gram.postId}>
                <a href={gram.image}>
                  <StyledImage src={gram.thumbnail} alt={gram.postId} />
                </a>
              </StyledImageWrapper>
            )
          }
        </StyledPostWrapper>
      ))}
    </StyledWrapper>
  );
}

GetPosts.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default GetPosts;
