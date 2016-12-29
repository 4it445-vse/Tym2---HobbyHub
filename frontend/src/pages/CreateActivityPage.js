import React, { Component } from 'react'
import './RegistrationPage.css';
import { connect } from 'react-redux';
import { userLogged, isUserLogged, getSession } from '../actions'
import api from '../api.js';

import Datetime from 'react-datetime';
import './DateTimePicker.css';
import Autocomplete from 'react-google-autocomplete';
import Select from 'react-select';
import './Select.css';

import { loadState } from  '../store/localState'

var NotificationSystem = require('react-notification-system');

const bgImage = require('../img/Rock-climbing-Wallpaper.jpg')

const sport = [
  { value: '1', label: 'Fotbal' },
  { value: '2', label: 'Floorbal' },
  { value: '3', label: 'Basketball' },
  { value: '4', label: 'Volejbal' },
  { value: '5', label: 'Házená' },
  { value: '6', label: 'Nohejbal' },
  { value: '7', label: 'Tenis' },
  { value: '8', label: 'Squash' },
  { value: '9', label: 'Jiné' },
];

const hry = [
  { value: '10', label: 'Počítačové' },
  { value: '11', label: 'Stolní společenské' },
  { value: '12', label: 'Deskovky' },
  { value: '13', label: 'Jiné' },
];

const cestovani = [
  { value: '14', label: 'Rekreační turistika' },
  { value: '15', label: 'Horská turistika' },
  { value: '16', label: 'Zahraniční turistika' },
  { value: '17', label: 'Vandr'},
  { value: '18', label: 'Památky' },
  { value: '19', label: 'Jiné' },
];

const jine = [
  { value: '20', label: 'Jiné' },
]

class CreateActivityPageRaw extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.props.userLogged(isUserLogged());

    console.log(this.props)

    this.setState({customerId: getSession().customerId,
                  user_count: 2,
                  subDisabled: true});

    this._addNotification = this._addNotification.bind(this);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleKategoryChange = this.handleKategoryChange.bind(this);
    this.handleSubkategoryChange = this.handleSubkategoryChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleUserCountChange = this.handleUserCountChange.bind(this);
    this.handleAboutChange = this.handleAboutChange.bind(this);

    this.handleNameblur = this.handleNameblur.bind(this);

    this.nameValid   = true;
    this.categoryValid = true;
    this.subcategoryValid = true;
    this.addressValid = true;
    this.dateValid = true;
  }

  _notificationSystem: null;

  _addNotification(cause, event) {
    event.preventDefault();
    switch (cause) {
      case "success":
        this._notificationSystem.addNotification({
          title: 'Success!',
          message: 'Akce byla úspěšně založena!',
          level: 'info'
        });
        break;
      case "error":
        this._notificationSystem.addNotification({
          title: 'Error!',
          message: 'Během založení akce došlo k chybě.',
          level: 'error'
        });
        break;
      case "error2":
        this._notificationSystem.addNotification({
          title: 'Error!',
          message: 'Zkontrolujte zda máte správně vyplněna všechna pole.',
          level: 'error'
        });
        break;
      default:
    }
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  handleNameChange(e) {
   this.setState({name: e.target.value});
   if (e.target.value === ""){
     this.nameValid = false;
  } else {
    this.nameValid = true;
  }
}
  handleKategoryChange(val){
    console.log(val)

    if (val === null) {
      this.setState({kategory: ''});
      this.setState({subDisabled: true});
      this.setState({subkategory: ''});
      this.setState({subcategoryValid: false});
      this.categoryValid = false;
    } else {
      this.setState({kategory: val.value});
      this.setState({subDisabled: false});
      this.categoryValid = true;

      var firstElement = ''

      switch(val.value) {
          case '1':
            this.setState({
            subkategoryOptions: sport
          });
          firstElement = sport[0].value
          break;
          case '2':
            this.setState({
              subkategoryOptions: hry
            });
            firstElement = hry[0].value
          break;
          case '3':
            this.setState({
              subkategoryOptions: cestovani
          });
          firstElement = cestovani[0].value
          break;
          case '4':
            this.setState({
              subkategoryOptions: jine
            });
            firstElement = jine[0].value
          break;
          default:
          this.setState({
            subkategoryOptions: []
          });
        };

    this.setState({subkategory: firstElement});
    }
  }
  handleSubkategoryChange(val){
    if (val === null) {
      this.setState({subkategory: ''});
      this.subcategoryValid = false;
    } else {
      this.setState({subkategory: val.value});
      this.subcategoryValid = true;
    }
  }
  handleCityChange(e) {
   this.setState({city: e.target.value});
  }
  handleAddressChange(e) {
    if (e.name === ""){
      this.addressValid = false;
   } else {
     this.setState({address: e.formatted_address});
     this.setState({city: e.address_components[2].long_name})
     this.addressValid = true;
   }
  }

  handleDateChange(e) {
   this.setState({date_and_time: e._d});
   if (e._d === null){
     this.dateValid = false;
  } else {
    this.dateValid = true;
  }
  }
  handleUserCountChange(val) {
   this.setState({user_count: val});
  }
  handleAboutChange(e) {
   this.setState({about: e.target.value});
  }

  handleNameblur(e){
    if (e.target.value === ""){
      this.nameValid = false;
   } else {
     this.nameValid = true;
   }
  }

  onSubmit(event) {
    event.preventDefault();
    console.log('submitted')
    var customer_id = loadState().auth.userId
    // console.log(customer_id)

// TODO Odebrat
      // console.log('Name: ' + this.state.name)
      // console.log('Kategory: ' + this.state.kategory)
      // console.log('Subkategory: ' + this.state.subkategory)
      // console.log('City: ' + this.state.city)
      // console.log('Address: ' + this.state.address)
      // console.log('Date: ' + this.state.date_and_time)
      // console.log('Users: ' + this.state.user_count)
      // console.log('About: ' + this.state.about)


      var user_count = 2
      if (this.state.user_count === ""){
        user_count = 2
      } else {
        user_count = this.state.user_count
      }

      if(
        this.nameValid &&
        this.categoryValid &&
        this.subcategoryValid &&
        this.addressValid &&
        this.dateValid
      ){

      var formData = {name: this.state.name,
                      kategory: this.state.kategory,
                      subcategory_id: this.state.subkategory,
                      city: this.state.city,
                      address: this.state.address,
                      date_and_time: this.state.date_and_time,
                      user_count: user_count,
                      about: this.state.about,
                      customer_id: customer_id
                    }

      api.post('Activities', formData)
      .then(({ data }) => {
        console.log('data', data);

        if (data){
        api.post(`/hasActivities/subscribeToActivity`, {"id": data.id})
        this._addNotification("success", event);
        setTimeout(() => {
          this.props.history.push(`/activityDetail/${data.id}`)
        },1500);

      }else{
        // isUserLogged = data

        this.setState({ errors: {} });
      };
      })
      .catch(error => {
        this._addNotification("error", event);
        console.log(error);
        const { response } = error;
        const { errors } = response.data.error.details;

        this.setState({ errors });
      });
    } else {
      this._addNotification("error2", event);
    }

    };

    nameCheckText(){
      if(!this.nameValid) return (<div>Jméno nesmí být prázdné</div>)
    }
    categoryCheckText(){
        if(!this.categoryValid) return (<div>Kategorie nesmí být prázdná</div>)
      }
    subcategoryCheckText(){
          if(!this.subcategoryValid) return (<div>Podkategorie nesmí být prázdná</div>)
        }
    addressCheckText(){
        if(!this.addressValid) return (<div>Adresanesmí být prázdná</div>)
      }

    dateCheckText(){
      if(!this.dateValid) return (<div>Datum nesmí být prázdné</div>)
    }

  render() {
    var nameValid = "";
    var categoryValid = "";
    var subcategoryValid = "";
    var addressValid = "";
    var dateValid = "";

    if(this.nameValid){
      nameValid = "";
    } else {
      nameValid = "has-error";
    }
    if(this.categoryValid){
      categoryValid = "";
    } else {
      categoryValid = "has-error";
    }
    if(this.subcategoryValid){
      subcategoryValid = "";
    } else {
      subcategoryValid = "has-error";
    }
    if(this.addressValid){
      addressValid = "";
    } else {
      addressValid = "has-error";
    }
    if(this.dateValid){
      dateValid = "";
    } else {
      dateValid = "has-error";
    }

    var imgStyle = {
        backgroundImage: 'url(' + bgImage + ')',
        backgroundSize: 'cover'
    }

    var kategoryOptions = [
        { value: '1', label: 'Sport' },
        { value: '2', label: 'Hry' },
        { value: '3', label: 'Cestování' },
        { value: '4', label: 'Jiné' }
    ];

    return (
      <div className="container-fluid" style={imgStyle}>
        <div className="row main">

          <div className="main-login main-center">
            <h2 className="title">Vytvořit aktivitu</h2>
            <form className="form-horizontal" method="post" onSubmit={this.onSubmit}>

              <div className="form-group">
                <label htmlFor="activity" className="cols-sm-2 control-label">Název aktivity</label>
                <div className="cols-sm-10">
                  <div className={"input-group " + nameValid}>
                    {/* <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                      <input type="text" className="form-control" name="activity" id="activity"
                    placeholder="Vložte název aktivity" onChange={this.handleNameChange} required/> */}
                    <span className="input-group-addon"><i className="fa fa-trophy fa" aria-hidden="true"></i></span>
                    <input type="text" onChange={this.handleNameChange} className="form-control" name="activity" id="activity"  placeholder="Vložte název aktivity"
                      required/>
                  </div>
                  {this.nameCheckText()}
                </div>
              </div>



              <div className="form-group ">
                <label htmlFor="activity" className="cols-sm-2 control-label">Kategorie</label>
                <div className="cols-sm-10">
                  <div className={"input-group " + categoryValid}>
                    <span className="input-group-addon"><i className="fa fa-bicycle fa" aria-hidden="true"></i></span>

                    <Select
                      name="form-field-name"
                      value={this.state ? this.state.kategory : ''}
                      options={kategoryOptions}
                      title="Zvolte kategorii"
                      onChange={this.handleKategoryChange}
                      clearable={true}
                      placeholder="Zvolte kategorii"
                      required
                    />

                  </div>
                  {this.categoryCheckText()}
                </div>
              </div>

              <div className="form-group ">
                <label htmlFor="activity" className="cols-sm-2 control-label">Podkategorie</label>
                <div className="cols-sm-10">
                  <div className={"input-group " + subcategoryValid}>
                    <span className="input-group-addon"><i className="fa fa-bicycle fa" aria-hidden="true"></i></span>

                    <Select
                      name="form-field-name"
                      value={this.state ? this.state.subkategory : ''}
                      options={this.state ? this.state.subkategoryOptions : []}
                      onChange={this.handleSubkategoryChange}
                      clearable={true}
                      placeholder="Zvolte podkategorii"
                      disabled={this.state ? (this.state.subDisabled == null ? true : this.state.subDisabled) : true}
                      autocomplete={true}
                      required
                    />

                  </div>
                  {this.subcategoryCheckText()}
                </div>
              </div>


              <div className="form-group">
                <label htmlFor="address" className="cols-sm-2 control-label">Adresa</label>
                <div className="cols-sm-10">
                  <div className={"input-group " + addressValid}>
                    <span className="input-group-addon"><i className="glyphicon glyphicon-map-marker" aria-hidden="true"></i></span>
                    <Autocomplete
                      className="form-control"
                      onPlaceSelected={(place) => {
                        this.handleAddressChange(place);
                      }}
                      types={['geocode']}
                      placeholder="Vložte adresu"
                      required
                    />

                  </div>
                  {this.addressCheckText()}
                </div>
              </div>


              <div className="form-group">
                <label htmlFor="user_count" className="cols-sm-2 control-label">Počet účastníků</label>
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-users fa" aria-hidden="true"></i></span>
                  {/* <input type="text" className="form-control" name="user_count" id="user_count"  placeholder="Vložte počet účastníků" onChange={this.handleUserCountChange}/> */}
                  <input type="number"
                    step={1}
                    min={1}
                    max={100}
                    id="user_count"
                    className="form-control"
                    onChange={this.handleUserCountChange}/>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="date_and_time" className="cols-sm-2 control-label">Datum</label>
                <div className="cols-sm-10">

                  <div className={"input-group " + dateValid}>
                    <span className="input-group-addon"><i className="fa fa-calendar fa" aria-hidden="true"></i></span>
                    {/* <input type="text" className="form-control" name="date" id="date"  placeholder="Datum" onChange={this.handleDateChange}/> */}
                    <Datetime required className="datetime" name="date" id="date" onChange={this.handleDateChange} placeholder="Vložte datum a čas"/>
                  </div>
                  {this.dateCheckText()}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="about" className="cols-sm-2 control-label">Popis</label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-align-justify fa" aria-hidden="true"></i></span>
                    <textarea required className="form-control" rows="5" name="comment" id="comment" placeholder="Krátký popis" onChange={this.handleAboutChange}></textarea>
                  </div>
                </div>
              </div>

              <div className="form-group ">
                <button type="submit" className="btn btn-primary btn-lg btn-block">Vytvořit</button>
              </div>

            </form>
            <div>
              <NotificationSystem ref="notificationSystem"/>
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

export default connect(mapStateToProps, { userLogged })(CreateActivityPageRaw)
