import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router';
import $ from 'jquery';

import './RegistrationPage.css';
import { connect } from 'react-redux';
import { userLogged, userSession, getSession, loginAction } from '../actions'
import api from '../api.js';
import { setAuthToken } from '../api'

import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

const bgImage = require('../img/Rock-climbing-Wallpaper.jpg')

class LoginPageRaw extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.testRequest = this.testRequest.bind(this);
  }

  handleEmailChange(e) {
   this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
   this.setState({password: e.target.value});
  }

  testRequest() {
    api.get('Customers/count')
      .then(({ data }) => {
        console.log('testRequestData', data)
      })
      .catch(error => {
        console.log('testRequestError', error)
      });
  }

  onSubmit(event) {
    event.preventDefault();
    var formData = {email: this.state.email, password: this.state.password}

    api.post('Customers/login', formData)
      .then(({ data }) => {
        const {
          id: authToken,
          userId,
          id, // id je token
        } = data;

        setAuthToken(id)
        loginAction(id, userId)

        this.setState({ error: null });
        alert('Success!');
      })
      .catch(error => {
        const { response } = error;
        const { message = "Login failed..." } = response.data.error || {};

        this.setState({ error: message });
      });
  }

  render() {
    var windowHeight = $(window).height();
    if (windowHeight > 690) { windowHeight = 690 }

    var imgStyle = {
        backgroundImage: 'url(' + bgImage + ')',
        backgroundSize: 'cover',
        height: windowHeight,
    }

    return (
      <div className="container-fluid" style={imgStyle}>
        <div className="row main">
          <div className="main-login main-center">
            <h2 className="title">Přihlášení</h2>

            <button className="btn btn-default" onClick={this.testRequest}>Test</button>

            <form id="loginForm" className="form-horizontal" method="post" onSubmit={this.onSubmit}>

              <div className="form-group">
                <label htmlFor="email" className="cols-sm-2 control-label">Email</label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
                    <input type="text" className="form-control" name="email" id="email"  placeholder="Vložte e-mail" onChange={this.handleEmailChange}/>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password" className="cols-sm-2 control-label">Heslo</label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                    <input type="password" className="form-control" name="password" id="password"  placeholder="Vložte heslo" onChange={this.handlePasswordChange}/>
                  </div>
                </div>
              </div>

              <div className="form-group ">
                <button type="submit" className="btn btn-primary btn-lg btn-block">Přihlásit</button>
              </div>
              <div className="login-register">
                Ještě nejste zaregistrovaní?  <Link to="/register">Registrovat</Link>
              </div>

            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer
  }
}

export default connect(mapStateToProps, { userLogged, loginAction })(LoginPageRaw)
//export default connect(undefined, { loginAction })(LoginPageRaw)
