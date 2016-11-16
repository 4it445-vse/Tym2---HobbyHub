import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router';
import $ from 'jquery';

import './RegistrationPage.css';
import { connect } from 'react-redux';
import { userLogged, isUserLogged, getSession } from '../actions'
import api from '../api.js';


const bgImage = require('../img/Rock-climbing-Wallpaper.jpg')

// var DatePicker = require("react-bootstrap-date-picker");

class CreateActivityPageRaw extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.props.userLogged(isUserLogged());

    this.setState({customerId: getSession().customerId });

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleUserCountChange = this.handleUserCountChange.bind(this);
    this.handleAboutChange = this.handleAboutChange.bind(this);
  }

  handleNameChange(e) {
   this.setState({name: e.target.value});
  }
  handleCityChange(e) {
   this.setState({city: e.target.value});
  }
  handleAddressChange(e) {
   this.setState({address: e.target.value});
  }
  handleDateChange(e) {
   this.setState({date_and_time: e.target.value});
  }
  handleUserCountChange(e) {
   this.setState({user_count: e.target.value});
  }
  handleAboutChange(e) {
   this.setState({about: e.target.value});
  }

  onSubmit(event) {
    event.preventDefault();
    console.log('submitted')

// TODO Odebrat
      console.log('Name: ' + this.state.name)
      console.log('City: ' + this.state.city)
      console.log('Address: ' + this.state.address)
      console.log('Date: ' + this.state.date_and_time)
      console.log('Users: ' + this.state.user_count)
      console.log('About: ' + this.state.about)



      var formData = {name: this.state.name,
                      city: this.state.city,
                      address: this.state.address,
                      date_and_time: this.state.date_and_time,
                      user_count: this.state.user_count,
                      about: this.state.about,
                      customerId: this.state.customerId}

      api.post('Activities/replaceOrCreate', formData)
      .then(({ data }) => {
        console.log('data', data);

        if (data){

        this.props.history.push(`/activityDetail/${data.id}`);
      }else{
        // isUserLogged = data

        this.setState({ errors: {} });
      };
      })
      .catch(error => {
        const { response } = error;
        console.log(error)
        const { errors } = response.data.error.details;

        this.setState({ errors });
      });

    }

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
					<form className="form-horizontal" method="post" onSubmit={this.onSubmit}>

          <div className="form-group ">
            <label htmlFor="activity" className="cols-sm-2 control-label">Název aktivity</label>
            <div className="cols-sm-10">
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                <input type="text" className="form-control" name="activity" id="activity"  placeholder="Vložte název aktivity" onChange={this.handleNameChange}/>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="city" className="cols-sm-2 control-label">Město</label>
            <div className="cols-sm-10">
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
                <input type="text" className="form-control" name="city" id="city"  placeholder="Zadejte město" onChange={this.handleCityChange}/>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address" className="cols-sm-2 control-label">Adresa</label>
            <div className="cols-sm-10">
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-users fa" aria-hidden="true"></i></span>
                <input type="text" className="form-control" name="address" id="address"  placeholder="Vložte adresu" onChange={this.handleAddressChange}/>
              </div>
              </div>
              </div>


          <div className="form-group">
            <label htmlFor="user_count" className="cols-sm-2 control-label">Počet účastníků</label>
            <div className="cols-sm-10">
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                <input type="text" className="form-control" name="user_count" id="user_count"  placeholder="Vložte počet účastníků" onChange={this.handleUserCountChange}/>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="date_and_time" className="cols-sm-2 control-label">Datum</label>
            <div className="cols-sm-10">
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-users fa" aria-hidden="true"></i></span>
                <input type="text" className="form-control" name="date" id="date"  placeholder="Datum" onChange={this.handleDateChange}/>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="about" className="cols-sm-2 control-label">Popis</label>
            <div className="cols-sm-10">
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                <textarea class="form-control" className="form-control" rows="5" name="comment" id="comment" placeholder="Krátký popis" onChange={this.handleAboutChange}></textarea>
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
