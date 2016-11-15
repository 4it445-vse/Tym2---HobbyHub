import React, { Component } from 'react'
import { Link } from 'react-router';
import $ from 'jquery';

import './RegistrationPage.css';

import { connect } from 'react-redux';
import { userLogged, isUserLogged } from '../actions'

const bgImage = require('../img/Rock-climbing-Wallpaper.jpg')

import api from '../api.js';

class LoginPageRaw extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.props.userLogged(false)
  }

  onSubmit(event) {
    event.preventDefault();
    console.log('submitted')
    const { items } =  this.props;
    const formItems = items.map(({ email, password }) => ({
      email: email,
      password: password,
    }))

    const formData = new FormData(event.target);
    formData.append(
      'items',
      JSON.stringify(formItems)
    );

    api.post('Customers/login', formData)
      .then(({ data }) => {
        console.log('data', data);

        // isUserLogged = data

        this.setState({ errors: {} });
      })
      .catch(error => {
        const { response } = error;
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
     <form className="form-horizontal" method="post" action="#">

      <div className="form-group">
       <label htmlFor="email" className="cols-sm-2 control-label">Email</label>
       <div className="cols-sm-10">
        <div className="input-group">
         <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
         <input type="text" className="form-control" name="email" id="email"  placeholder="Enter your Email"/>
        </div>
       </div>
      </div>

      <div className="form-group">
       <label htmlFor="password" className="cols-sm-2 control-label">Password</label>
       <div className="cols-sm-10">
        <div className="input-group">
         <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
         <input type="password" className="form-control" name="password" id="password"  placeholder="Enter your Password"/>
        </div>
       </div>
      </div>

      <div className="form-group ">
       <button type="submit" className="btn btn-primary btn-lg btn-block login-button">Login</button>
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
