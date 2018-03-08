import React, {Component} from 'react';
import {Nav, Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import {BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom'

import * as routes from '../constants/routes';
import SignOutButton from '../Containers/SignOut';

import firebase, {auth, provider} from '../firebase/index.js';

const Navigation = ({authUser}) => <div>
  {
    authUser
      ? <NavigationAuth/>
      : <NavigationNonAuth/>
  }
</div>

const NavigationNonAuth = () => <div>
  <Navbar inverse="inverse" collapseOnSelect="collapseOnSelect">
    <Navbar.Header>
      <Navbar.Brand>
        <Link to={routes.LANDING}>Crypto Portfolio</Link>
      </Navbar.Brand>
      <Navbar.Toggle/>
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1}>
          <Link to={routes.ABOUT}>About</Link>
        </NavItem>
      </Nav>
      <Nav pullRight="pullRight">
        <NavItem eventKey={1} href="#">
          <Link to={routes.SIGN_IN}>Sign In</Link>
        </NavItem>
        <NavItem eventKey={2} href="#">
          <Link to={routes.REGISTER}>Register</Link>
        </NavItem>
        <NavItem eventKey={3} href="#">
          Language
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>

</div>

const NavigationAuth = () => <div>
  <Navbar inverse="inverse" collapseOnSelect="collapseOnSelect">
    <Navbar.Header>
      <Navbar.Brand>
        <Link to={routes.LANDING}>Crypto Portfolio</Link>
      </Navbar.Brand>
      <Navbar.Toggle/>
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1}>
          <Link to={routes.ABOUT}>About</Link>
        </NavItem>
        <NavItem eventKey={1}>
          <Link to={routes.ACCOUNT}>Personal</Link>
        </NavItem>
      </Nav>
      <Nav pullRight="pullRight">
        <NavItem eventKey={1} href="#">
          <SignOutButton/>
        </NavItem>
        <NavItem eventKey={3} href="#">
          Language
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
</div>

export default Navigation;
