import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router';
import $ from 'jquery';
import api from '../api.js';

import './RegistrationPage.css';
import { connect } from 'react-redux';
import { userLogged } from '../actions';
import api from '../api.js';

const bgImage = require('../img/Rock-climbing-Wallpaper.jpg')

class RegistrationPageRaw extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
/*<<<<<<< HEAD
    this.props.userLogged(false);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleNameChange(e) {
   this.setState({name: e.target.value});
  }
  handleUsernameChange(e) {
   this.setState({username: e.target.value});
  }
  handlePasswordChange(e) {
   this.setState({password: e.target.value});
  }
  handleEmailChange(e) {
   this.setState({email: e.target.value});
=======*/
    this.onUserInput = this.onUserInput.bind(this);
    this.props.userLogged(false);
    this.state = {
      password:"",
      confirm:"",
      pwdVal: true,
      errors: {}
    };
    this.pwdValid =true;
//>>>>>>> fc3f317a1f885c1f5413499ccab426a3c3818c3a
  }

  onSubmit(event) {
    event.preventDefault();
/*<<<<<<< HEAD
    console.log('submitted')

// TODO Odebrat
      console.log('Email: ' + this.state.email)
      console.log('Password: ' + this.state.password)
      console.log('Name: ' + this.state.name)
      console.log('Username: ' + this.state.username)


      var formData = {email: this.state.email,
                      password: this.state.password,
                      name: this.state.name,
                      username: this.state.username}

      api.post('Customers/replaceOrCreate', formData)
      .then(({ data }) => {
        console.log('data', data);

        if (data){

        browserHistory.goBack()
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


=======*/
    console.log("name",this.state.name,"email",this.state.email)
    console.log(this.pwdValid);
    if(this.pwdValid){
      const formData = {
            "username": this.state.name,
            "email": this.state.email,
            "password": this.state.password
          };

      api.post('Customers', formData)
        .then(({ data }) => {
          console.log('data', data);

          if (data){

          browserHistory.goBack()
        })
        .catch(error => {
          console.log(error);

          const { response } = error;
          const { errors } = response.data.error.details;

          this.setState({ errors });
        });
  }

  onUserInput(event){

    if(event.target.name === "password" || event.target.name === "confirm"){
        if(event.target.value === this.state.confirm ||
          event.target.value === this.state.password){
          this.pwdValid=true
        } else {
          this.pwdValid=false
        }
    }
    switch (event.target.id) {
      case "name":
        this.setState({
          name:event.target.value
        });
        break;
      case "email":
        this.setState({
          email:event.target.value
        });
        break;
      case "username":
        this.setState({
          username:event.target.value
        });
        break;
      case "password":
        this.setState({
          password:event.target.value
        });
        break;
      case "confirm":
        this.setState({
          confirm:event.target.value
        });
        break;
      default:
    }
//>>>>>>> fc3f317a1f885c1f5413499ccab426a3c3818c3a

  }

  render() {
    var windowHeight = $(window).height();
    if(windowHeight > 690) {
      windowHeight = 690
    }

  /*  console.log("pwdState::", this.state.password);
    console.log("confState::", this.state.confirm);
    console.log("target::", event.target.value);*/

    var imgStyle = {
        backgroundImage: 'url(' + bgImage + ')',
        backgroundSize: 'cover',
        height: windowHeight,
    }

    var pwdValid = "";
    if(this.pwdValid){
      pwdValid = "";
    } else {
      pwdValid = "has-error";
    }

//    console.log("STATE:", this.state);

    return (
      <div className="container-fluid" style={imgStyle}>
        <div className="row main">

          <div className="main-login main-center form-group">
            <h2 className="title">Registrace</h2>
            <form className="form-horizontal" method="post" action="#">

              <div className="form-group required">
                <label htmlFor="name" className="cols-sm-2 control-label">Jméno</label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                    <input type="text" onChange={this.onUserInput} className="form-control" name="name" id="name"  placeholder="Enter your Name"/>
                  </div>
                </div>
              </div>

              <div className="form-group required">
                <label htmlFor="email" className="cols-sm-2 control-label">Email</label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
                    <input type="text" onChange={this.onUserInput} className="form-control" name="email" id="email"  placeholder="Enter your Email"/>
                  </div>
                </div>
              </div>

              <div className="form-group required">
                <label htmlFor="username" className="cols-sm-2 control-label">Uživatelské jméno</label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-users fa" aria-hidden="true"></i></span>
                    <input type="text" onChange={this.onUserInput} className="form-control" name="username" id="username"  placeholder="Enter your Username"/>
                  </div>
                </div>
              </div>

              <div className="form-group required">
                <label htmlFor="password" className="cols-sm-2 control-label">Heslo</label>
                <div className="cols-sm-10">
                  <div className={"input-group " + pwdValid}>
                    <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                    <input type="password" onChange={this.onUserInput} className="form-control" name="password" id="password"  placeholder="Enter your Password"/>
                  </div>
                </div>
              </div>

              <div className="form-group required">
                <label htmlFor="confirm" className="cols-sm-2 control-label">Heslo znovu</label>
                <div className="cols-sm-10">
                  <div className={"input-group " + pwdValid}>
                    <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                    <input type="password" onChange={this.onUserInput} className="form-control" name="confirm" id="confirm"  placeholder="Confirm your Password"/>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <button type="button" onClick={this.onSubmit} className="btn btn-primary btn-lg btn-block login-button">Register</button>
              </div>
              <div className="login-register">
                <Link to="/login">Login</Link>
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

export default connect(mapStateToProps, { userLogged })(RegistrationPageRaw)
