import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledFollowButton = styled.a`
  display: inline-block;
  width: 260px;
  height: 45px;
  background-color: #208cee;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FollowButton = ({ username }) => (
  <StyledFollowButton href={`https://instagram.com/${username}`}>
    Follow
  </StyledFollowButton>
);

FollowButton.propTypes = {
  username: PropTypes.string.isRequired,
};

export default FollowButton;
