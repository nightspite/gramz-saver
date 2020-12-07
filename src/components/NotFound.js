import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'routes';
import PropTypes from 'prop-types';

const NotFound = ({ marginLeft }) => (
  <div style={{ marginLeft: `${marginLeft}` }}>
    <h1>There was an error!</h1>
    <Link to={routes.home}>Go Home</Link>
  </div>
);

NotFound.propTypes = {
  marginLeft: PropTypes.number,
};

NotFound.defaultProps = {
  marginLeft: 0,
};

export default NotFound;
