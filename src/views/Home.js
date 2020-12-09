import React from 'react';
import styled from 'styled-components';

import Search from 'components/Search';

const HomeWrapper = styled.div`
  height: 100vh;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home = () => (
  <HomeWrapper>
    <h2>Search for Instagram Profiles!</h2>
    <Search />
  </HomeWrapper>
);

export default Home;
