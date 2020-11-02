/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../routes';
// import styled from 'styled-components';

function FindUser() {
  const [username, setUsername] = useState('');

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={handleChange}
      />
      <Link to={routes.posts + username}>posts</Link>
    </form>
  );
}

export default FindUser;
