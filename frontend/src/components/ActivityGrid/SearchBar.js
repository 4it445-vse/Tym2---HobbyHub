import React, { Component } from 'react'
import { connect } from 'react-redux';

import { isUserLogged, userLogged } from '../../actions'

import SearchBar from 'search-bar-component';

export class SearchBarRaw extends Component {
  constructor(props){
    super(props);
  }

  render() {

    return (
      <div className="search-bar-wrapper">
        <div className="search-bar-field">
          {/* <input type="text" className="search-bar-input" maxlength="100" placeholder={this.props.placeholder}/> */}

          <div className="search-col relative tags col-xs-8">
            <i className="icon-docs icon-append"></i>
            <div className="react-tagsinput">
              <span>
                <div className="react-autosuggest__container">
                  <input type="text" className="search-bar-input" onChange={this.props.handleSearchChange} maxlength="100" placeholder={this.props.placeholder}/>
                </div>
              </span>
            </div>
          </div>

          <div className="search-col col-xs-4">
            <button role="button" type="button" className="btn-search btn-block btn btn-primary">
              <i className="icon-search"></i>
              <strong>Najít událost</strong>
            </button>
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

export default connect(mapStateToProps, { isUserLogged, userLogged })(SearchBarRaw)
