import React from 'react';
import { Link } from 'react-router';
import { Nav, DropdownButton, MenuItem } from 'react-bootstrap'
import _ from 'lodash'

const logo = require('../../img/paper-plane.png')

export const DefaultNavigation = () => (
  <div className="container-fluid" id="navfluid">
  <div className="navbar-header">
    <Link to="/" className="navbar-brand vcenter changeFont" href="#"><span><img className="img-responsive2 vcenter" src={logo} alt="logo"/></span> HobbyHub</Link>
    <Nav pullRight>
      <DropdownButton noCaret pullRight
          title={ _.times( 3, (i) => <span key={i} className="icon-bar"></span> )}
          className="navbar-toggle navbar-right" id="bg-nested-dropdown">
        <MenuItem href="/login"><text className="text-muted">
          <span className="glyphicon glyphicon-user"></span> Přihlásit se</text></MenuItem>
        <MenuItem href="/register"><text className="text-muted">
          <span className="glyphicon glyphicon-plus"></span> Registrace</text></MenuItem>
      </DropdownButton>
    </Nav>
  </div>
  <div className="collapse navbar-collapse" id="navigationbar">
    <ul className="nav navbar-nav navbar-right">
      <li><Link to="/login"><span className="glyphicon glyphicon-user"></span> Přihlásit se</Link></li>
      <li><Link to="/register"><span className="glyphicon glyphicon-plus"></span> Registrace</Link></li>
    </ul>
  </div>
  </div>
);
