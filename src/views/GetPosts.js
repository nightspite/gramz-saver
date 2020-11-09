/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { routes } from 'routes';
import NotFound from 'components/NotFound';
import Loading from 'components/molecules/Loading';

const StyledWrapper = styled.div`
  margin-left: 470px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const StyledImageWrapper = styled.div`
  margin-bottom: 25px;
  margin-right: 25px;
`;
const StyledImage = styled.img`
  width: 400px;
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
    return <Loading />;
  }

  if (gramz.length === 0) {
    return <NotFound />;
  }

  return (
    <StyledWrapper>
      {gramz.map((gram) => (
        <StyledImageWrapper key={gram.postId}>
          <Link to={routes.post + gram.postShortcode}>
            <StyledImage src={gram.thumbnail} alt={gram.postShortcode} />
          </Link>
        </StyledImageWrapper>
      ))}
    </StyledWrapper>
  );
}

GetPosts.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default GetPosts;
