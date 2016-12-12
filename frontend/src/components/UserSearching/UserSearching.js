import React, { Component } from 'react';
import SearchBar from 'search-bar-component';
import { PageHeader, Grid} from 'react-bootstrap'
import { createFilter } from 'react-search-input'
import lodash from 'lodash'

import '../ActivityGrid/SearchBar.css';
import { User } from './User.js'
import api from '../../api.js';

export class UserSearching extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      searchTerm: null
    }
  }

  componentDidMount() {
    api('Customers').then((response) => {
      this.setState({
          users: response.data
      })
    })
  }

  _onSearchUser(username) {
    if (username.split("").length > 1){
      this.setState({
        searchTerm: username
      })
    } else {
      this.setState({
        searchTerm: null
      })
    }
  }

  _renderSearchBar(){
    return (
      <div>
        <PageHeader><h4>Najdi parťáka a pozvi ho na akci!</h4></PageHeader>
        <SearchBar
          placeholder="Najdi parťáka..."
          onChange={(username) => {this._onSearchUser(username)}}
          onSearch={(username) => {this._onSearchUser(username)}}
          autoFocus
        />
        <br/>
      </div>
    )
  }

  _getUsers(){
    var { users, searchTerm } = this.state
    if(searchTerm){
      let usersByUsername = users.filter(createFilter(this.state.searchTerm, 'username'))
      let usersByEmail = users.filter(createFilter(this.state.searchTerm, 'email'))
      users = lodash.uniq(usersByUsername.concat(usersByEmail))
    }
    return users
  }

  render() {
    const { activityId } = this.props
    return (
      <div className="container-fluid">
        {this._renderSearchBar()}
        <Grid>
          {
            (this.state.searchTerm != null) ? this._getUsers().map( user => {
              return (
                <User name={user.username} id={user.id} email={user.email} activityId={activityId}/>
              )
            }) :
            null
          }
        </Grid>
        <br/>
      </div>
    )
  }
}
