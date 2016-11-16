import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router';
import $ from 'jquery';

import './RegistrationPage.css';
import { connect } from 'react-redux';
import { userLogged } from '../actions';
import api from '../api.js';

const bgImage = require('../img/Rock-climbing-Wallpaper.jpg')

class RegistrationPageRaw extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
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
  }

  onSubmit(event) {
    event.preventDefault();
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



  }

  render() {
    var windowHeight = $(window).height();
    if(windowHeight > 690) {
      windowHeight = 690
    }

    var imgStyle = {
        backgroundImage: 'url(' + bgImage + ')',
        backgroundSize: 'cover',
        height: windowHeight,
    }

    return (
      <div className="container-fluid" style={imgStyle}>
      <div className="row main">

				<div className="main-login main-center">
        <h2 className="title">Registrace</h2>
					<form className="form-horizontal" method="post" onSubmit={this.onSubmit}>

						<div className="form-group">
							<label htmlFor="name" className="cols-sm-2 control-label">Jméno</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
									<input type="text" className="form-control" name="name" id="name"  placeholder="Vložte své jméno" onChange={this.handleNameChange}/>
								</div>
							</div>
						</div>

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
							<label htmlFor="username" className="cols-sm-2 control-label">Uživatelské jméno</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-users fa" aria-hidden="true"></i></span>
									<input type="text" className="form-control" name="username" id="username"  placeholder="Vložte uživatelské jeméno" onChange={this.handleUsernameChange}/>
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

						<div className="form-group">
							<label htmlFor="confirm" className="cols-sm-2 control-label">Heslo znovu</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
									<input type="password" className="form-control" name="confirm" id="confirm"  placeholder="Potvrďte heslo"/>
								</div>
							</div>
						</div>

						<div className="form-group ">
							<button type="submit" className="btn btn-primary btn-lg btn-block login-button">Registrovat</button>
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
