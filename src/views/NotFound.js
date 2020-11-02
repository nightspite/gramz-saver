import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../routes';

const NotFound = () => (
  <div>
    <h1>404 - Not Found!</h1>
    <Link to={routes.home}>Go Home</Link>
  </div>
);

export default NotFound;
