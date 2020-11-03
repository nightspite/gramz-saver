/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../routes';
// import styled from 'styled-components';

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
        placeholder="username"
        value={url}
        onChange={handleChange}
      />
      <Link to={routes.profile + url}>profile</Link>
      <Link to={routes.posts + url}>posts</Link>
      <Link to={routes.post + url}>post</Link>
    </form>
  );
}

export default Search;
