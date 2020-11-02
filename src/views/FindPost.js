/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../routes';
// import styled from 'styled-components';

function FindPost() {
  const [shortcode, setShortcode] = useState('');

  const handleChange = (event) => {
    setShortcode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="link to a post"
        value={shortcode}
        onChange={handleChange}
      />
      <Link
        to={
          routes.post +
          shortcode
            .split('/')
            .filter((e) => e)
            .pop()
        }
      >
        find post
      </Link>
    </form>
  );
}

export default FindPost;
