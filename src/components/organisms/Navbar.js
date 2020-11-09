import React from 'react';
import styled from 'styled-components';
import Logo from 'assets/logo.svg';
import Home from 'assets/home.svg';
import Search from 'assets/search.svg';
import Instagram from 'assets/instagram.svg';

const StyledNavbar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  width: 100vw;
  height: 120px;
  padding: 0 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
`;

const StyledMenuLogo = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLogoIcon = styled.img`
  height: 24px;
`;

const StyledInstagram = styled.img`
  margin-top: 5px;
  margin-left: 25px;
  height: 40px;
`;

const StyledMenuIcons = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
`;

const StyledIcon = styled.img`
  height: 20px;
  width: 20px;
  margin: 0 25px;
`;

const Navbar = () => (
  <StyledNavbar>
    <StyledMenuLogo>
      <StyledLogoIcon src={Logo} alt="Instagram" />
      <StyledInstagram src={Instagram} alt="Instagram" />
    </StyledMenuLogo>

    <StyledMenuIcons>
      <StyledIcon src={Home} alt="Home" />
      <StyledIcon src={Search} alt="Search" />
    </StyledMenuIcons>
  </StyledNavbar>
);

export default Navbar;
