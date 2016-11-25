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

    this.onUserInput = this.onUserInput.bind(this);
    this.handleUserBlur = this.handleUserBlur.bind(this);
    this.props.userLogged(false);
    this.state = {
      password:"",
      confirm:"",
      username:"",
      pwdVal: true,
      errors: {},
      userValid: true
    };
    this.pwdValid   = true;
    this.emailValid = true;
    this.pwdComplex = true;
  }

  onSubmit(event) {
    event.preventDefault();

    console.log("name",this.state.name,"email",this.state.email)
    console.log(this.pwdValid && this.emailValid);
    if(this.pwdValid){

      const formData = new FormData(event.target);
      const regData = {
          username: formData.get('username'),
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
        this.emailValid = true;
      } else {
        this.emailValid = false;
      }
    }

    if(event.target.name === "password"){
      if (event.target.value.match(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=\S*?[!"$%^&*_]).{8,12})$/g)) {
        this.pwdComplex = true;
      } else {
        this.pwdComplex = false;
      }
    }

    switch (event.target.id) {
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
  }

  handleUserBlur(){
    const regData = {
        username: this.state.username
      };

      //pro vyzkoušení
      /*if(this.state.username === "martin"){
        this.setState({userValid:false});
      } else {
        this.setState({userValid: true});
      }*/

    //TODO: Dodělat až bude odpovídající služba
    api.post('Customer/Customer_findByUsername', regData)
      .then(({ data }) => {
        console.log('data', data);
        if(data.length>0){
          this.setState({userValid: true});
        } else {
          this.setState({userValid:false});
        }
      })
      .catch(error => {
        console.log(error);
      });
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
    var userValid = "";
    var pwdComplex = "";

    if(this.pwdValid){
      pwdValid = "";
    } else {
      pwdValid = "has-error";
    }

    if(this.pwdComplex){
      pwdComplex = "";
    } else {
      pwdComplex = "has-error";
    }

    if(this.emailValid){
      emailValid = "";
    } else {
      emailValid = "has-error";
    }

    if(this.state.userValid){
      userValid = "";
    } else {
      userValid = "has-error";
    }

    return (
      <div className="container-fluid" style={imgStyle}>
        <div className="row main">

          <div className="main-login main-center form-group">
            <h2 className="title">Registrace</h2>
            <form className="form-horizontal" onSubmit={this.onSubmit}>

              {/*<div className="form-group required">
                <label htmlFor="name" className="cols-sm-2 control-label">Jméno</label>
                <div className="cols-sm-10">
                <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                <input type="text" onChange={this.onUserInput} className="form-control" name="name" id="name"  placeholder="Zadejte Jméno"/>
                </div>
                </div>
              </div>*/}

              <div className="form-group required">
                <label htmlFor="username" className="cols-sm-2 control-label">Uživatelské jméno</label>
                <div className="cols-sm-10">
                  <div className={"input-group " + userValid}>
                    <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
                    <input type="text" maxLength="20" onChange={this.onUserInput} onBlur={this.handleUserBlur} className="form-control" name="username" id="username"  placeholder="Zadejte Uživatelské jméno"
                      required/>
                  </div>
                  {this.userCheckText()}
                </div>
              </div>

              <div className="form-group required">
                <label htmlFor="email" className="cols-sm-2 control-label">Email</label>
                <div className="cols-sm-10">
                  <div className={"input-group " + emailValid}>
                    <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
                    <input type="email" onChange={this.onUserInput} className="form-control"
                      name="email" id="email"  placeholder="Zadejte Email" required/>
                  </div>
                  {this.emailCheckText()}
                </div>
              </div>

              <div className="form-group required">
                <label htmlFor="password" className="cols-sm-2 control-label">Heslo</label>
                <div className="cols-sm-10">
                  <div className={"input-group " + pwdComplex}>
                    <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                    <input type="password" onChange={this.onUserInput} className="form-control" name="password" id="password"  placeholder="Zadejte Heslo" required/>
                  </div>
                  {this.pwdCheckText('pwd')}
                </div>
              </div>

              <div className="form-group required">
                <label htmlFor="confirm" className="cols-sm-2 control-label">Heslo znovu</label>
                <div className="cols-sm-10">
                  <div className={"input-group " + pwdValid}>
                    <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                    <input type="password" onChange={this.onUserInput} className="form-control" name="confirm" id="confirm"
                      placeholder="Potvrďte Heslo" required/>
                  </div>
                  {this.pwdCheckText('con')}
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

  pwdCheckText(type){
    if(type === 'pwd' && !this.pwdComplex)    {
      return (<div>Heslo musí obsahovat: a-z, A-Z, 0-9 a alespoň jeden znak z !"$%^&*_</div>)
    }
    if(type === 'con' && !this.pwdValid){
      return (<div>Hesla se neshodují</div>)
    }
  }

  emailCheckText(){
    if(!this.emailValid) return (<div>Zadaný email není validní</div>)
  }

  userCheckText(){
    if(!this.state.userValid) return (<div>Zadaný username již existuje</div>)
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer
  }
}

export default connect(mapStateToProps, { userLogged })(RegistrationPageRaw)
