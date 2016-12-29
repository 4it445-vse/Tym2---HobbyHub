import React, { Component } from 'react'
import { connect } from 'react-redux';

import { isUserLogged, userLogged } from '../../actions'

export class SearchBarRaw extends Component {
  render() {

    return (
      <div className="row">
        <div className="col-md-12">
          <div id="custom-search-input">
            <div className="input-group col-md-12">
              <input type="text" className="form-control input-lg" onChange={this.props.handleSearchChange} placeholder="Sportovní seance Praha..." />
              <span className="input-group-btn">
                <button className="btn btn-info btn-lg" type="button">
                  <i className="glyphicon glyphicon-search"></i>
                </button>
              </span>
            </div>
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
