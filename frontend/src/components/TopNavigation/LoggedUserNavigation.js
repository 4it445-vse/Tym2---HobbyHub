import React, { Component } from 'react';
import { Link } from 'react-router';
import { Nav, DropdownButton, MenuItem } from 'react-bootstrap';
import _ from 'lodash';

import { saveState } from  '../../store/localState';
import api from '../../api';
import { setAuthToken } from '../../api';

const logo = require('../../img/paper-plane.png');
import { logoutAction } from '../../actions';

export class LoggedUserNavigation extends Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout(e) {
    const { logoutAction, userLogged } = this.props;

    api.post('Customers/logout')
      .then(({ data }) => {
        console.log('logout post data', data)
      })
      .catch(error => {
        console.log('logout post error', error)
      });

    saveState({})
    setAuthToken(undefined)
    logoutAction()
    userLogged(false)
    this.props.history.push('/login')
  }

  render() {
    return (
      <div>
        <div className="container-fluid" id="navfluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand vcenter changeFont" href="#"><span><img className="img-responsive2 vcenter" src={logo} alt="logo"/></span> HobbyHub</Link>
            <Nav pullRight>
              <DropdownButton noCaret pullRight
                title={ _.times( 3, (i) => <span key={i} className="icon-bar"></span> )}
                className="navbar-toggle navbar-right" id="bg-nested-dropdown">
                <MenuItem  href="/createActivity"><text className="text-success">
                  <span className="glyphicon glyphicon-flag"></span> Vytvořit událost</text></MenuItem>
                <MenuItem divider />
                <MenuItem href="/profile"><text className="text-muted">
                  <span className="glyphicon glyphicon-user"></span> Můj profil</text></MenuItem>
                <MenuItem href="/friends"><text className="text-muted">
                  <span className="glyphicon glyphicon-heart"></span> Přátelé</text></MenuItem>
                <MenuItem href="/settings"><text className="text-muted">
                  <span className="glyphicon glyphicon-cog"></span> Nastavení</text></MenuItem>
                <MenuItem onClick={this.onLogout} href="/login"><text className="text-muted">
                  <span className="glyphicon glyphicon-log-out"></span> Odhlásit se</text></MenuItem>
              </DropdownButton>
            </Nav>
          </div>
          <div className="collapse navbar-collapse" id="navigationbar">
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/createActivity"><span className="glyphicon glyphicon-flag"></span> Vytvořit událost</Link></li>
              <li><Link to="/profile"><span className="glyphicon glyphicon-user"></span> Můj profil</Link></li>
              <li><Link to="/friends"><span className="glyphicon glyphicon-heart"></span> Přátelé</Link></li>
              <li><Link to="/settings"><span className="glyphicon glyphicon-cog"></span> Nastavení</Link></li>
              <li onClick={this.onLogout}>
                <Link to="/login"><span className="glyphicon glyphicon-log-out"></span> Odhlásit se</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
