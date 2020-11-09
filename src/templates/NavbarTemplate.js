import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'components/organisms/Navbar';
import styled from 'styled-components';

const StyledContentWrapper = styled.div`
  margin-top: 170px;
`;

const NavbarTemplate = ({ children }) => (
  <div>
    <Navbar />
    <StyledContentWrapper>{children}</StyledContentWrapper>
  </div>
);

NavbarTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default NavbarTemplate;
