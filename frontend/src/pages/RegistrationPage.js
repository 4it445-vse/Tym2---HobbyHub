import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router';
import $ from 'jquery';
import api from '../api.js';

import './RegistrationPage.css';
import { connect } from 'react-redux';
import { userLogged } from '../actions';

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
    this.pwdValid   = true;
    this.emailValid = true;
  }

  onSubmit(event) {
    event.preventDefault();

    console.log("name",this.state.name,"email",this.state.email)
    console.log(this.pwdValid && this.emailValid);
    if(this.pwdValid){

      const formData = new FormData(event.target);
      const regData = {
          username: formData.get('name'), //jak to bdue v tabulce?
          email : formData.get('email'),
          password : formData.get('password')
      };

      api.post('Customers', regData)
        .then(({ data }) => {
          console.log('data', data);

          if (data){

          this.props.history.push('/login');
          // TODO tohle je cilove chovani, ale ted to nechceme
          //browserHistory.goBack()
          }
        })
        .catch(error => {
          console.log(error);

          const { response } = error;
          const { errors } = response.data.error.details;

          this.setState({ errors });
        });
    } else {
      console.log(this.pwdValid);
    }
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

    if(event.target.name === "email"){
      if (event.target.value.match(/^\w+([^\u0000-\u0080]?[\.!#$%^&*()\-+-]?\w+)*@\S+/g)) {
        console.log("štymuje");
        this.emailValid = true;
      } else {
        console.log("neštymuje");
        this.emailValid = false;
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
    var emailValid = "";
    if(this.pwdValid){
      pwdValid = "";
    } else {
      pwdValid = "has-error";
    }

    if(this.emailValid){
      emailValid = "";
    } else {
      emailValid = "has-error";
    }

//    console.log("STATE:", this.state);

    return (
      <div className="container-fluid" style={imgStyle}>
        <div className="row main">

          <div className="main-login main-center form-group">
            <h2 className="title">Registrace</h2>
            <form className="form-horizontal" onSubmit={this.onSubmit} data-toggle="validator">

              <div className="form-group required">
                <label htmlFor="name" className="cols-sm-2 control-label">Jméno</label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                    <input type="text" onChange={this.onUserInput} className="form-control" name="name" id="name"  placeholder="Zadejte Jméno"/>
                  </div>
                </div>
              </div>

              <div className="form-group required">
                <label htmlFor="username" className="cols-sm-2 control-label">Příjmení</label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
                    <input type="text" onChange={this.onUserInput} className="form-control" name="surname" id="surname"  placeholder="Zadejte Příjmení"/>
                  </div>
                </div>
              </div>

              <div className="form-group required">
                <label htmlFor="email" className="cols-sm-2 control-label">Email</label>
                <div className="cols-sm-10">
                  <div className={"input-group " + emailValid}>
                    <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
                    <input type="email" onChange={this.onUserInput} className="form-control" name="email" id="email"  placeholder="Zadejte Email"/>
                  </div>
                </div>
              </div>


              <div className="form-group required">
                <label htmlFor="password" className="cols-sm-2 control-label">Heslo</label>
                <div className="cols-sm-10">
                  <div className={"input-group " + pwdValid}>
                    <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                    <input type="password" onChange={this.onUserInput} className="form-control" name="password" id="password"  placeholder="Zadejte Heslo" required/>
                  </div>
                </div>
              </div>

              <div className="form-group required">
                <label htmlFor="confirm" className="cols-sm-2 control-label">Heslo znovu</label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                    <input type="password" onChange={this.onUserInput} className="form-control" data-match="#password" name="confirm" id="confirm"
                      data-match-error="Whoops, these don't match" placeholder="Potvrďte Heslo" required/>
                    <div class="help-block with-errors"></div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-lg btn-block login-button">Register</button>
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
