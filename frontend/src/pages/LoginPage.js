import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router';
import $ from 'jquery';

import './RegistrationPage.css';
import { connect } from 'react-redux';
import { userLogged, loginAction } from '../actions'
import api from '../api.js';
//import { setAuthToken } from '../api'
import { loadState } from  '../store/localState' //, saveState

var NotificationSystem = require('react-notification-system');

const bgImage = require('../img/Rock-climbing-Wallpaper.jpg')

class LoginPageRaw extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailBlur = this.handleEmailBlur.bind(this);
    this.testRequest = this.testRequest.bind(this);
    this._addNotification = this._addNotification.bind(this);

    this.props.userLogged(false);
    // userLogged(false)
    this.state = {
      emailValid: true
    };
    this.emailValid = true;
  }
  _notificationSystem: null;

  _addNotification(cause, event) {
    event.preventDefault();
    switch (cause) {
      case "success":
        this._notificationSystem.addNotification({
          title: 'Success!',
          message: 'Přihlášení proběhlo úspěšně',
          level: 'info'
        });
        break;
      case "error":
        this._notificationSystem.addNotification({
          title: 'Error!',
          message: 'Během přihlášení došlo k chybě.',
          level: 'error'
        });
        break;
        default:
        this._notificationSystem.addNotification({
          title: 'Error!',
          message: 'Během přihlášení došlo k neočekávané chybě.',
          level: 'error'
        });
    }
  }

  onUserInput(event){
    if(event.target.name === "email"){
      if (event.target.value.match(/^\w+([^\u0000-\u0080]?[\.!#$%^&*()\-+-]?\w+)*@\S+/g)) {
        this.emailValid = true;
      } else {
        this.emailValid = false;
      }
    }
    switch (event.target.id) {
      case "email":
        this.setState({
          email:event.target.value
        });
        break;
      default:
    }
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
    userLogged(false)
  }

  handleEmailChange(e) {
   this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
   this.setState({password: e.target.value});
  }

  // <button className="btn btn-default" onClick={this.testRequest}>Test</button>
  testRequest() {
    console.log('loadState output: ',loadState());
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
        console.log("LOG DATA", data);
        const { loginAction } = this.props;
        const {
          id: authToken,
          userId,
          // id, // id je token
        } = data;

        //saveState({...loadState(), authToken: id, userId: userId})
        //setAuthToken(id)
        loginAction(authToken, userId)
        this.setState({ error: null });
        this._addNotification("success", event);
        setTimeout(() => {
          console.log(browserHistory)
          browserHistory.goBack()
          // this.props.history.push('/land')
        },1500);
      })
      .catch(error => {
        const { response } = error;
        const { message = "Login failed..." } = response.data.error || {};

        this.setState({ error: message });
        this._addNotification("error", event);
      });
  }

  handleEmailBlur(){
    return 1 // smazat az bude findByEmail
    // if(this.state.email ){
    //   // dočasně zakomentováno ať konzole neprudí
    //   // const regData = {
    //   //     username: this.state.email
    //   //   }
    //
    //   api.get('Customers/'+this.state.email+'/findByEmail')
    //     .then(({ data }) => {
    //       console.log('data', data);
    //       if(data.length>0){
    //         this.setState({emailValid:true});
    //       } else {
    //         this.setState({emailValid:false});
    //       }
    //     })
    //     .catch(error => {
    //       console.log(error);
    //       this.setState({emailValid:false});
    //     })
    // } else {
    //   this.setState({emailValid:false});
    // }
  }

  emailCheckText(){
    if(!this.state.emailValid) return (<div>Zadaný email není validní</div>)
  }

  render() {
    var windowHeight = $(window).height();
    if (windowHeight > 690) { windowHeight = 690 }

    var imgStyle = {
        backgroundImage: 'url(' + bgImage + ')',
        backgroundSize: 'cover',
        height: windowHeight,
    }

    var emailValid = "";
    if(this.emailValid){
      emailValid = "";
    } else {
      emailValid = "has-error";
    }

    if(!this.state.emailValid){
      emailValid = "has-error";
    }

    return (
      <div className="container-fluid" style={imgStyle}>
        <div className="row main">
          <div className="main-login main-center">
            <h2 className="title">Přihlášení</h2>

            <form id="loginForm" className="form-horizontal" method="post" onSubmit={this.onSubmit}>

              <div className="form-group required">
                <label htmlFor="email" className="cols-sm-2 control-label">Email</label>
                <div className="cols-sm-10">
                  <div className={"input-group " + emailValid}>
                    <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
                    <input type="text" className="form-control" name="email" id="email"  placeholder="Vložte e-mail"
                      onChange={this.handleEmailChange}
                      onBlur={this.handleEmailBlur}
                    />
                  </div>
                  {this.emailCheckText()}
                </div>
              </div>

              <div className="form-group required">
                <label htmlFor="password" className="cols-sm-2 control-label">Heslo</label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                    <input type="password" className="form-control" name="password" id="password"  placeholder="Vložte heslo"
                      onChange={this.handlePasswordChange}/>
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
            <div>
              <NotificationSystem ref="notificationSystem"/>
            </div>
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
