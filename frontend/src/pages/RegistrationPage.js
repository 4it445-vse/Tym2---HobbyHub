import React, { Component } from 'react'
import { Link, /*browserHistory*/ } from 'react-router';
//import $ from 'jquery';
import api from '../api.js';

// import './RegistrationPage.css';
import { connect } from 'react-redux';
import { userLogged } from '../actions';

import { loadState } from  '../store/localState'


var NotificationSystem = require('react-notification-system');

const bgImage = require('../img/Rock-climbing-Wallpaper.jpg');


class RegistrationPageRaw extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.onUserInput = this.onUserInput.bind(this);
    this._addNotification = this._addNotification.bind(this);
    this.handleUserBlur = this.handleUserBlur.bind(this);
    this.handleEmailBlur = this.handleEmailBlur.bind(this);
    this.handleEmailFocus = this.handleEmailFocus.bind(this);
    this.props.userLogged(false);
    this.state = {
      password:"",
      confirm:"",
      username:"",
      errors: {},
      userValid: true,
      emailValid: true
    };
    this.pwdValid   = true;
    this.emailValid = true;
    this.pwdComplex = true;
  }

  _notificationSystem: null;

  _addNotification(cause, event) {
    event.preventDefault();
    switch (cause) {
      case "success":
        this._notificationSystem.addNotification({
          title: 'Success!',
          message: 'Vaše registrace byla úspěšně dokončena!',
          level: 'info'
        });
        break;
      case "error":
        this._notificationSystem.addNotification({
          title: 'Error!',
          message: 'Během registrace došlo k chybě.',
          level: 'error'
        });
        break;
      case "error2":
        this._notificationSystem.addNotification({
          title: 'Error!',
          message: 'Zkontrolujte zda máte správně vyplněna všechna pole.',
          level: 'error'
        });
        break;
      default:
    }
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;

      if (loadState().length != 0){
        this.props.history.push('/land')
      }
  }

  onSubmit(event) {
    event.preventDefault();

    console.log("name",this.state.name,"email",this.state.email)
    console.log(this.pwdValid && this.emailValid);
    if(
      this.pwdValid &&
      this.emailValid &&
      this.pwdComplex &&
      this.state.userValid &&
      this.state.emailValid
    ){

      const formData = new FormData(event.target);
      const regData = {
          username: formData.get('username'),
          email : formData.get('email'),
          password : formData.get('password')
      };

      console.log("regData---", regData);

      api.post('Customers', regData)
        .then(({ data }) => {

          if (data){
            this._addNotification("success", event);
            setTimeout(() => {
              this.props.history.push('/login')
            },1500);

            // TODO tohle je cilove chovani, ale ted to nechceme
            //browserHistory.goBack()
          }
        })
        .catch(error => {
          this._addNotification("error", event);
          console.log(error);
          const { response } = error;
          const { errors } = response.data.error.details;

          this.setState({ errors });
        });
    } else {

      this._addNotification("error2", event);
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
    if(this.state.username){
    /*const regData = {
        username: this.state.username
      };*/

    api.get('Customers/'+this.state.username+'/findByUsername')
      .then(({ data }) => {
        console.log('data', data);
        if(data){
          this.setState({userValid:false});
        } else {
          this.setState({userValid:true});
        }
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  handleEmailBlur(){
    console.log(this.state.email);
    console.log(this.state.emailValid);
    if(this.state.email &&
      this.emailValid){
    /*  const regData = {
          username: this.state.email
        };
*/
      //TODO: Dodělat až bude odpovídající služba
      api.get('Customers/'+this.state.email+'/findByEmail')
        .then(({ data }) => {
          console.log('data', data);
          if(data){
            this.setState({emailValid:false});
          } else {
            this.setState({emailValid:true});
          }
        })
        .catch(error => {
          console.log(error);
          this.setState({emailValid:false});
        });
    } else {
      this.setState({emailValid:true});
    }
  }

  handleEmailFocus(){
    this.setState({emailValid:true});
  }

  render() {
    // var windowHeight = $(window).height();
    // if(windowHeight > 690) {
    //   windowHeight = 690
    // }

    var imgStyle = {
        backgroundImage: 'url(' + bgImage + ')',
        backgroundSize: 'cover',
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

    if(!this.state.emailValid){
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
                    <input type="email" onChange={this.onUserInput} onBlur={this.handleEmailBlur} onFocus={this.handleEmailFocus} className="form-control"
                      name="email" id="email"  placeholder="Zadejte Email" required/>
                  </div>
                  {this.emailCheckText()}
                  {this.emailExistsText()}
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
            <div>
              <NotificationSystem ref="notificationSystem"/>
            </div>
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

  emailExistsText(){
    if(!this.state.emailValid) return (<div>Zadaný email již existuje</div>)
  }

  userCheckText(){
    if(!this.state.userValid) return (<div>Zadané uživatelské jméno již existuje</div>)
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer
  }
}

export default connect(mapStateToProps, { userLogged })(RegistrationPageRaw)
