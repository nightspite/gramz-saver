/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from 'routes';

const StyledForm = styled.div`
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 50%;
`;

const StyledInput = styled.input`
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid #9b9b9b;
  outline: 0;
  font-size: 1.3rem;
  /* color: #fff; */
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ label {
    font-size: 1.3rem;
    cursor: text;
    top: 20px;
  }

  &:focus {
    ~ label {
      position: absolute;
      top: 0;
      display: block;
      transition: 0.2s;
      font-size: 1rem;
      color: #11998e;
      font-weight: 700;
    }
    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, #11998e, #38ef7d);
    border-image-slice: 1;
  }

  &:required,
  &:invalid {
    box-shadow: none;
  }
`;

const StyledLabel = styled.label`
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: #9b9b9b;
  z-index: -1;
`;

const StyledLink = styled(Link)`
  padding: 12px 20px;
  margin: 10px 15px;
  color: #222;
  text-align: center;
  display: block;
  width: 50%;
  text-decoration: none;
  border: 10px solid;
  border-width: 3px;
  border-image: linear-gradient(to right, #11998e, #38ef7d);
  border-image-slice: 1;
  border-radius: 3px;
  transition: all 0.3s;

  &:hover {
    font-weight: 700;
    border-color: #fff;
    background: linear-gradient(to right, #11998e, #38ef7d);
    color: #fff;
  }
`;

const StyledLinksList = styled.div`
  width: 100%;
  display: flex;
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

  return (
    <StyledForm>
      <StyledInput
        type="text"
        placeholder="username or link"
        value={url}
        onChange={handleChange}
        name="inp"
      />
      <StyledLabel htmlFor="inp">username or link</StyledLabel>
      <StyledLinksList>
        <StyledLink to={routes.profile + url}>profile</StyledLink>
        <StyledLink to={routes.post + url}>post</StyledLink>
      </StyledLinksList>
    </StyledForm>
  );
}

export default Search;
