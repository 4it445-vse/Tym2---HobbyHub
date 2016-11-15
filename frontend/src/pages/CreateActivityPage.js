import React, { Component } from 'react'
import { Link } from 'react-router';
import $ from 'jquery';

import './RegistrationPage.css';
import { connect } from 'react-redux';
import { userLogged } from '../actions'

const bgImage = require('../img/Rock-climbing-Wallpaper.jpg')

class CreateActivityPageRaw extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.props.userLogged(true)
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

    var imgStyle = {
        backgroundImage: 'url(' + bgImage + ')',
        backgroundSize: 'cover',
        height: windowHeight,
    }

    return (
      <div className="container-fluid" style={imgStyle}>

        <div className="row main">

          <div className="main-login main-center">
            <h2 className="title">Create activity</h2>
            <form className="form-horizontal" method="post" action="#">

              <div className="form-group required">
                <label htmlFor="category" className="cols-sm-2 control-label">Category</label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                    <input type="text" className="form-control" name="category" id="category"  placeholder="Select Category"/>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="activity" className="cols-sm-2 control-label">Activity name</label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                    <input type="text" className="form-control" name="activity" id="activity"  placeholder="Enter Activity name"/>
                  </div>
                </div>
              </div>

						<div className="form-group">
							<label htmlFor="From" className="cols-sm-2 control-label">From</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
									<input type="text" className="form-control" name="from" id="from"  placeholder="From"/>
								</div>
							</div>
						</div>

            <div className="form-group">
              <label htmlFor="To" className="cols-sm-2 control-label">To</label>
              <div className="cols-sm-10">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                  <input type="text" className="form-control" name="to" id="to"  placeholder="To"/>
                </div>
              </div>
            </div>

						<div className="form-group">
							<label htmlFor="city" className="cols-sm-2 control-label">City</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
									<input type="text" className="form-control" name="city" id="city"  placeholder="City"/>
								</div>
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="street" className="cols-sm-2 control-label">Street</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-users fa" aria-hidden="true"></i></span>
									<input type="text" className="form-control" name="street" id="street"  placeholder="Enter Street"/>
								</div>
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="number-of-people" className="cols-sm-2 control-label">Number of people</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
									<input type="text" className="form-control" name="number-of-people" id="number-of-people"  placeholder="Enter number of People"/>
								</div>
							</div>
						</div>

						<div className="form-group ">
							<button type="button" className="btn btn-primary btn-lg btn-block login-button">Create</button>
						</div>

					</form>
				</div>
      </div>
>>>>>>> aff42908b635f7dd01b70f0ad5c085d254edd6e1

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer
  }
}

export default connect(mapStateToProps, { userLogged })(CreateActivityPageRaw)
