import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import slimUpHighlights from 'functions/slimUpHighlights';
import NotFound from 'components/NotFound';
import { routes } from 'routes';
// import Loading from 'components/molecules/Loading';

const StyledHighlightsWrapper = styled.div`
  margin-top: 30px;
  width: 280px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  overflow-y: auto;
  max-height: 400px;
`;

const StyledHighlight = styled.div`
  /* margin-top: 10px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledHightlightImageWrapper = styled.div`
  width: 75px;
  height: 75px;
  border: 2px solid #e5e5e5;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledHighlightImage = styled.img`
  width: 65px;
  height: 65px;
  border-radius: 50%;
`;

const StyledHighlightTitle = styled.p`
  margin-top: 5px;
  color: #a0a0a0;
  font-size: 1.2rem;
  text-align: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const ProfileHightlights = ({ userId, number }) => {
  const [errors, setErrors] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hightlights, setHighlights] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // eslint-disable-next-line no-undef
      const data = await fetch(
        `/.netlify/functions/gethighlightsids?user=${userId}&number=${number}`,
      ).then((response) =>
        response.status !== 200 ? setErrors(response.status) : response.json(),
      );

      setHighlights(data);
      setIsLoaded(true);
    };

    fetchData();
  }, []);

  if (errors) {
    return <NotFound />;
  }
  if (!isLoaded) {
    // return <Loading />;
    return <div>Loading...</div>;
  }

  if (hightlights.length === 0) {
    return <NotFound />;
  }

  return (
    <StyledHighlightsWrapper>
      {hightlights.items.map((hightlight) => (
        <StyledLink
          to={routes.highlights + hightlight.hightlightId}
          key={hightlight.hightlightId}
        >
          <StyledHighlight>
            <StyledHightlightImageWrapper>
              <StyledHighlightImage
                src={hightlight.thumbnail}
                alt={hightlight.hightlightId}
              />
            </StyledHightlightImageWrapper>
            <StyledHighlightTitle>{hightlight.title}</StyledHighlightTitle>
          </StyledHighlight>
        </StyledLink>
      ))}
    </StyledHighlightsWrapper>
  );
};

ProfileHightlights.propTypes = {
  userId: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};

export default ProfileHightlights;
