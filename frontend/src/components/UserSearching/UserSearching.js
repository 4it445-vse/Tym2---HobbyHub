import React, { Component } from 'react';

import SearchBar from 'search-bar-component';
import { PageHeader, Grid} from 'react-bootstrap'
import '../ActivityGrid/SearchBar.css';

import { User } from './User.js'

export class UserSearching extends Component {

  constructor(props) {
    super(props);

  }

  _onSearchUser(username) {

  }

  _header(){
    return (
      <div>
        <PageHeader><h4>Najdi parťáka a pozvi ho na akci!</h4></PageHeader>
        <SearchBar placeholder="Najdi parťáka..."
          onChange={(username, resolve) => {this._onSearchUser(username)}}
          onSearch={(username) => {this._onSearchUser(username)}}
        />
        <br/>
      </div>
    )
  }

  render() {
    return (
      <div className="container-fluid">
        {this._header()}
        <Grid>
          <User name="Ekzim Hnědko" id={1} />
          <User name="Daniel Šrám" id={2} />
        </Grid>
        <br/>
      </div>
    )
  }
}
