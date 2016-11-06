import React, { Component } from 'react';

import { connect } from 'react-redux';
import { userLogged } from '../actions'

class SettingsPageRaw extends Component {

  constructor(props) {
    super(props);
    this.props.userLogged(true)
  }

  render() {
    return (
      <div className="container-fluid">
        <h1>Settings</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer
  }
}

export default connect(mapStateToProps, { userLogged })(SettingsPageRaw)
