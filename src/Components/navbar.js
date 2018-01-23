import React, { Component } from 'react';
import {Nav, Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
//importing other pages for routing
import About from '../Containers/About.js'
import Main from '../Containers/Main.js'

export default class AppNavbar extends Component{
render(){
  return(
      <Router>
      <div>
        <Navbar inverse collapseOnSelect>
  		<Navbar.Header>
  			<Navbar.Brand>
  				<Link to="/">Crypto Portfolio</Link>
  			</Navbar.Brand>
  			<Navbar.Toggle />
  		</Navbar.Header>
  		<Navbar.Collapse>
  			<Nav>
  				<NavItem eventKey={1}>
  					<Link to="/about">About</Link>
  				</NavItem>
  			</Nav>
  			<Nav pullRight>
  				<NavItem eventKey={1} href="#">
  					Login
  				</NavItem>
  				<NavItem eventKey={2} href="#">
  					Language
  				</NavItem>
  			</Nav>
  		</Navbar.Collapse>
  	</Navbar>

    <Route exact path="/" component={Main}/>
    <Route path="/about" component={About}/>


    </div>
  </Router>

  )
}
}
