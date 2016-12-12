import React, { Component } from 'react';

import { connect } from 'react-redux';
import { userLogged } from '../actions'

import { ProfileForm } from '../components/Profile/ProfileForm.js';

import './RegistrationPage.css';
const bgImage = require('../img/Rock-climbing-Wallpaper.jpg');

class MyProfilePageRaw extends Component {

  constructor(props) {
    super(props);
    this.props.userLogged(true)
  }

  render() {
    var imgStyle = {
        backgroundImage: 'url(' + bgImage + ')',
        backgroundSize: 'cover',
    }

    return (
      <div className="container-fluid" style={imgStyle}>
        <div className="row main">
          <div className="main-profile">
            <ProfileForm></ProfileForm>
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

export default connect(mapStateToProps, { userLogged })(MyProfilePageRaw)
