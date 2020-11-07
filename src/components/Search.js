/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from 'routes';

const StyledLink = styled(Link)`
  padding: 0 10px;
`;

function Search() {
  const [url, setUrl] = useState('');

  const handleChange = (event) => {
    setUrl(
      event.target.value
        .split('/')
        .filter((e) => e)
        .pop(),
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="username or link"
        value={url}
        onChange={handleChange}
      />
      <StyledLink to={routes.profile + url}>profile</StyledLink>
      <StyledLink to={routes.posts + url}>posts</StyledLink>
      <StyledLink to={routes.post + url}>post</StyledLink>
      <StyledLink to={routes.stories + url}>stories</StyledLink>
    </form>
  );
}

export default Search;
