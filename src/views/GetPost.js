/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NotFound from 'components/NotFound';
import slimUpPost from 'functions/slimUpPost';
import Loading from 'components/molecules/Loading';
import NavbarTemplate from 'templates/NavbarTemplate';
import Slider from 'components/slider/Slider';

function GetPost({ location }) {
  const [errors, setErrors] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [gramz, setGramz] = useState([]);
  const shortcode = location.pathname
    .split('/')
    .filter((e) => e)
    .pop();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://instagram.com/p/${shortcode}/?__a=1`,
      ).then((response) =>
        response.status !== 200 ? setErrors(response.status) : response.json(),
      );

      setGramz(slimUpPost(data));
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
    <NavbarTemplate>
      <Slider gramz={gramz} />
    </NavbarTemplate>
  );
}

GetPost.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default GetPost;
