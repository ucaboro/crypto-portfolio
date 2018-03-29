import React from 'react';
import {Nav, Navbar, NavItem, SplitButton, MenuItem} from 'react-bootstrap'

import { Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import { auth } from '../firebase/index.js';

import * as routes from '../constants/routes';

const Navigation = (props, {authUser}) => <div>
  {
    authUser
      ? <NavigationAuth/>
      : <NavigationNonAuth/>
  }
</div>

Navigation.contextTypes = {
  authUser: PropTypes.object,
};





const NavigationNonAuth = () => <div>
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <LinkContainer to={routes.LANDING}>
      <Navbar.Brand>
        Crypto Portfolio
      </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle/>
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to={routes.ABOUT}>
          <NavItem eventKey={1}>
          About ❓
        </NavItem>
        </LinkContainer>
      </Nav>
      <Nav pullRight>
        <LinkContainer to={routes.SIGN_IN}>
        <NavItem eventKey={1}>
          Sign In 🔑
        </NavItem>
        </LinkContainer>
        <LinkContainer to={routes.REGISTER}>
        <NavItem eventKey={2}>
          Register 📝
        </NavItem>
        </LinkContainer>
        <NavItem eventKey={3}>
          Language 🌐
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>

</div>

const NavigationAuth = () => <div>
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <LinkContainer to={routes.LANDING}>
      <Navbar.Brand>
        Crypto Portfolio
      </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle/>
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to={routes.ABOUT}>
        <NavItem eventKey={1}>
          About ❓
        </NavItem>
        </LinkContainer>
        <LinkContainer to={routes.ACCOUNT}>
        <NavItem eventKey={1}>
          Personal 👤
        </NavItem>
        </LinkContainer>
      </Nav>

      <Nav pullRight>
        <NavItem eventKey={5} onClick={auth.doSignOut}>
          Sign Out 🔒
        </NavItem>

        <NavItem eventKey={3} >
          Language 🌐
        </NavItem>

      </Nav>
    </Navbar.Collapse>
  </Navbar>



</div>

export default Navigation;
