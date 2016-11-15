import React, { Component } from 'react'
import { Link } from 'react-router';
import $ from 'jquery';

import './RegistrationPage.css';
import { connect } from 'react-redux';
import { userLogged } from '../actions'

const bgImage = require('../img/Rock-climbing-Wallpaper.jpg')

var DatePicker = require("react-bootstrap-date-picker");

class CreateActivityPageRaw extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.props.userLogged(true)
  }

  onSubmit(event) {
    event.preventDefault();
    console.log('submitted')
  };

  render() {

    var windowHeight = $(window).height();
    if(windowHeight > 690) {
      windowHeight = 900
    }


    var imgStyle = {
        backgroundImage: 'url(' + bgImage + ')',
        backgroundSize: 'cover'
    }



    return (
      <div className="container-fluid" style={imgStyle}>
      <div className="row main">

				<div className="main-login main-center">
        <h2 className="title">Vytvořit aktivitu</h2>
					<form className="form-horizontal" method="post" action="#">

          <div className="form-group ">
            <label htmlFor="activity" className="cols-sm-2 control-label">Název aktivity</label>
            <div className="cols-sm-10">
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                <input type="text" className="form-control" name="activity" id="activity"  placeholder="Vložte název aktivity"/>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="city" className="cols-sm-2 control-label">Město</label>
            <div className="cols-sm-10">
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
                <input type="text" className="form-control" name="city" id="city"  placeholder="Zadejte město"/>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address" className="cols-sm-2 control-label">Adresa</label>
            <div className="cols-sm-10">
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-users fa" aria-hidden="true"></i></span>
                <input type="text" className="form-control" name="address" id="address"  placeholder="Vložte adresu"/>
              </div>
              </div>
              </div>


          <div className="form-group">
            <label htmlFor="user_count" className="cols-sm-2 control-label">Počet účastníků</label>
            <div className="cols-sm-10">
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                <input type="text" className="form-control" name="user_count" id="user_count"  placeholder="Vložte počet účastníků"/>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="date_and_time" className="cols-sm-2 control-label">Datum</label>
            <div className="cols-sm-10">
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-users fa" aria-hidden="true"></i></span>
                <input type="text" className="form-control" name="date" id="date"  placeholder="Datum"/>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="about" className="cols-sm-2 control-label">Popis</label>
            <div className="cols-sm-10">
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                <textarea class="form-control" className="form-control" rows="5" name="comment" id="comment" placeholder="Krátký popis"></textarea>
              </div>
            </div>
          </div>


						<div className="form-group ">
							<button type="submit" className="btn btn-primary btn-lg btn-block">Vytvořit</button>
						</div>

					</form>
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

export default connect(mapStateToProps, { userLogged })(CreateActivityPageRaw)
