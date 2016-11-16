import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router';
import $ from 'jquery';

import './RegistrationPage.css';
import { connect } from 'react-redux';
import { userLogged, userSession, getSession } from '../actions'
import api from '../api.js';

import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

const bgImage = require('../img/Rock-climbing-Wallpaper.jpg')

class LoginPageRaw extends Component {

  constructor(props) {
    super(props);
    this.props.userLogged(false)
    console.log('starting')
    this.onSubmit = this.onSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

  }

  handleEmailChange(e) {
   this.setState({email: e.target.value});
  }
  handlePasswordChange(e) {
   this.setState({password: e.target.value});
  }

  onSubmit(event) {
    event.preventDefault();
    console.log('submitted')

// TODO Odebrat
      console.log('Email: ' + this.state.email)
      console.log('Password: ' + this.state.password)

      var formData = {email: this.state.email, password: this.state.password}

      api.post('Customers/login', formData)
      .then(({ data }) => {
        console.log('data', data);

        if (data){
        userSession(data)
        this.props.userLogged(true)
        browserHistory.goBack()
        console.log(getSession())
      }else{
        // isUserLogged = data

        this.setState({ errors: {} });
      };
      })
      .catch(error => {
        const { response } = error;
        console.log(error)
        const { errors } = response.data.error.details;

        this.setState({ errors });
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
      <h2 className="title">Login</h2>

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
       <label htmlFor="password" className="cols-sm-2 control-label">Password</label>
       <div className="cols-sm-10">
        <div className="input-group">
         <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
         <input type="password" className="form-control" name="password" id="password"  placeholder="Vložte heslo" onChange={this.handlePasswordChange}/>
        </div>
       </div>
      </div>

      <div className="form-group ">
       <button type="submit" className="btn btn-primary btn-lg btn-block">Login</button>
      </div>
      <div className="login-register">
                Not registered yet?  <Link to="/register">Register</Link>
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

export default connect(mapStateToProps, { userLogged })(LoginPageRaw)
