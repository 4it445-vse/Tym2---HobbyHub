import React from 'react';
import { Link } from 'react-router';
import { Nav, DropdownButton, MenuItem } from 'react-bootstrap'
import _ from 'lodash'

export const DefaultNavigation = () => (
  <div className="container-fluid" id="navfluid">
  <div className="navbar-header">
    <Link to="/login"><a className="navbar-brand" href="#">HobbyHub</a></Link>
    <Nav pullRight>
      <DropdownButton noCaret pullRight
          title={ _.times( 3, (i) => <span key={i} className="icon-bar"></span> )}
          className="navbar-toggle navbar-right" id="bg-nested-dropdown">
        <MenuItem><Link to="/login"><text className="text-muted">
          <span className="glyphicon glyphicon-user"></span> Login</text></Link></MenuItem>
        <MenuItem><Link to="/register"><text className="text-muted">
          <span className="glyphicon glyphicon-plus"></span> Register</text></Link></MenuItem>
      </DropdownButton>
    </Nav>
  </div>
  <div className="collapse navbar-collapse" id="navigationbar">
    <ul className="nav navbar-nav navbar-right">
      <li><Link to="/login"><span className="glyphicon glyphicon-user"></span> Login</Link></li>
      <li><Link to="/register"><span className="glyphicon glyphicon-plus"></span> Register</Link></li>
    </ul>
  </div>
  </div>
);
