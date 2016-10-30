import React, { Component } from 'react'
import { Link } from 'react-router';
import $ from 'jquery';

import './RegistrationPage.css';

const IMAGE_1 = 'http://www.webgranth.com/wp-content/uploads/2014/07/Rock-climbing-Wallpaper.jpg'
const IMAGE_2 = 'http://www.pixelstalk.net/wp-content/uploads/2016/09/Hiking-dventure-Wallpaper.jpg'
const IMAGE_3 = 'http://www.pixelstalk.net/wp-content/uploads/2016/09/Adventure-HD-Wallpaper.jpg'

export class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    console.log('submitted')
  }

  render() {
    var windowHeight = $(window).height();
    if(windowHeight > 690) {
      windowHeight = 690
    }
    return (
      <div className="container-fluid" style={{backgroundImage: `url(${IMAGE_3})`, backgroundSize: `cover`, height: {windowHeight}}}>
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
       <button type="button" className="btn btn-primary btn-lg btn-block login-button">Login</button>
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
