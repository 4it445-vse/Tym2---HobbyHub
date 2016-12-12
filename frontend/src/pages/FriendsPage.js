import React, { Component } from 'react';

import { connect } from 'react-redux';
import { userLogged } from '../actions'

import { UserSearching } from '../components/UserSearching/UserSearching.js'

class FriendsPageRaw extends Component {

  constructor(props) {
    super(props);
    this.props.userLogged(true)
  }

  render() {
    return (
      <div className="container-fluid">
        <h1>My Friends</h1>
        <UserSearching/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer
  }
}

export default connect(mapStateToProps, { userLogged })(FriendsPageRaw)
