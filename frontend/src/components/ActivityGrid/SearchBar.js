import React, { Component } from 'react'
import { connect } from 'react-redux';

import { isUserLogged, userLogged } from '../../actions'

import SearchBar from 'search-bar-component';
import './SearchBar.css';

export class SearchBarRaw extends Component {
  render() {

    return (
      <SearchBar placeholder="Search for activity..."
        onChange={(searchTerm, resolve) => {
          // get suggestions asynchronously based on `searchTerm`,
          // then pass them to `resolve()` to populate suggestions
        }}
        onSearch={(searchTerm) => {
          // do something on search
        }} />

    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer
  }
}

export default connect(mapStateToProps, { isUserLogged, userLogged })(SearchBarRaw)
