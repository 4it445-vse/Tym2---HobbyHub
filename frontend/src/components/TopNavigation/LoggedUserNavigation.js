import React, { Component } from 'react';
import { Link } from 'react-router';
import { Nav, DropdownButton, MenuItem } from 'react-bootstrap'
import _ from 'lodash'

const logo = require('../../img/paper-plane.png')

export class LoggedUserNavigation extends Component {

  // this.props.logoutAction

  render() {
  <div className="container-fluid" id="navfluid">
    <div className="navbar-header">
      <Link to="/" className="navbar-brand vcenter changeFont" href="#"><span><img className="img-responsive2 vcenter" src={logo}/></span> HobbyHub</Link>
      <Nav pullRight>
        <DropdownButton noCaret pullRight
            title={ _.times( 3, (i) => <span key={i} className="icon-bar"></span> )}
            className="navbar-toggle navbar-right" id="bg-nested-dropdown">
          <MenuItem><Link to="/createActivity"><text className="text-success">
            <span className="glyphicon glyphicon-flag"></span> Vytvořit událost</text></Link></MenuItem>
          <MenuItem divider />
          <MenuItem><Link to="/profile"><text className="text-muted">
            <span className="glyphicon glyphicon-user"></span> Můj profil</text></Link></MenuItem>
          <MenuItem><Link to="/friends"><text className="text-muted">
            <span className="glyphicon glyphicon-heart"></span> Přátelé</text></Link></MenuItem>
          <MenuItem><Link to="/settings"><text className="text-muted">
            <span className="glyphicon glyphicon-cog"></span> Nastavení</text></Link></MenuItem>
        </DropdownButton>
      </Nav>
    </div>
    <div className="collapse navbar-collapse" id="navigationbar">
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/createActivity"><span className="glyphicon glyphicon-flag"></span> Vytvořit událost</Link></li>
        <li><Link to="/profile"><span className="glyphicon glyphicon-user"></span> Můj profil</Link></li>
        <li><Link to="/friends"><span className="glyphicon glyphicon-heart"></span> Přátelé</Link></li>
        <li><Link to="/settings"><span className="glyphicon glyphicon-cog"></span> Nastavení</Link></li>
      </ul>
    </div>
  </div>
  }
}
