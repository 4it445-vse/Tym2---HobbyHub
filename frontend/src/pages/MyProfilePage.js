import React, { Component } from 'react';

import { connect } from 'react-redux';
import { userLogged } from '../actions'

import { ProfileForm } from '../components/Profile/ProfileForm.js';

class MyProfilePageRaw extends Component {

  constructor(props) {
    super(props);
    this.props.userLogged(true)
  }

  render() {
    return (
      <ProfileForm></ProfileForm>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer
  }
}

export default connect(mapStateToProps, { userLogged })(MyProfilePageRaw)
