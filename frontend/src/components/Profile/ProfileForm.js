import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Jumbotron, Thumbnail, Grid, Button, Col, Row, Form, FormGroup, InputGroup, FormControl, Radio, ButtonGroup, DropdownButton, MenuItem, ControlLabel } from 'react-bootstrap';

import { ProfileInput } from '../Profile/ProfileInput.js';

import Datetime from 'react-datetime';

import api from '../../api.js';

import { userLogged, isUserLogged, getSession } from '../../actions'

import { loadState } from '../../store/localState.js'

export class ProfileForm extends Component {
  constructor(props){
    super(props);
    this.customerId = loadState().auth.userId;
    this.textChange = this.textChange.bind(this);
    this.dropChange = this.dropChange.bind(this);
    this.clickSave = this.clickSave.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      profile:null,
      inputState:"readOnly",
      btnText:"pencil",
      toggle:"",
      Město:"",
      Stav:"",
      Pohlaví:"",
      Výška:"",
      Váha:"",
      birth_date:"",
      Povolání:"",
      about:""
    };
    /*this.drop = {
      1:"Muž",
      2:"Žena",
    };*/
    this.isLoaded = false;
  }

  handleClick(){
    if (this.state.inputState === 'readOnly'){
      this.setState({
        inputState:"",
        btnText:"ok"
      });
    } else {
      this.setState({
        inputState:"readOnly",
        btnText:"pencil"
      });

      this.clickSave();
    }
  };


  componentDidMount(){
    console.log("CUSTOMER ID::", this.customerId);
      api.get('/Customers/'+this.customerId+'/profile')
        .then((response) => {

          var profile = [];
          var data = response.data;

          for(var colName in data){
            var o = {};
            o.key = colName;
            o.val = data[colName];
            if(colName === "birth_date"){
              o.type = "date";
            };
            profile.push(o);
          }

          profile = this.mapNames(profile);
          this.isLoaded = true;
          this.setState({profile:profile});
        })
        .catch(error => {
          console.log(error);
          const { response } = error;
          const { errors } = response.data.error.details;

          this.setState({ errors });
        });
  }

  mapNames(obj){
    for (var i = 0; i < obj.length; i++) {
      switch (obj[i].key) {
        case "city":
          obj[i].key = "Město";
          this.setState({[obj[i].key]:obj[i].val});
          break;
        case "marital_status":
          obj[i].key = "Stav";
          this.setState({[obj[i].key]:obj[i].val});
          break;
        case "birth_date":
          obj[i].key = "birth_date";
          var oldDate = obj[i].val.split("-");
          var day = oldDate[2].substring(0,2);
          obj[i].val = oldDate[0] + "-" + oldDate[1] + "-" + day;
          this.setState({[obj[i].key]:obj[i].val});
          break;
        case "gender":
          obj[i].key = "Pohlaví";
          this.setState({[obj[i].key]:obj[i].val});
          delete obj[i];
          break;
        case "height":
          obj[i].key = "Výška";
          this.setState({[obj[i].key]:obj[i].val});
          break;
        case "weight":
          obj[i].key = "Váha";
          this.setState({[obj[i].key]:obj[i].val});
          break;
        case "profession":
          obj[i].key = "Povolání";
          this.setState({[obj[i].key]:obj[i].val});
          break;
        case "aboutMe":
          obj[i].key = "O mě";
          this.setState({about:obj[i].val});
          delete obj[i];
          break;
        case "id":
          delete obj[i];
          break;
        case "customer_id":
          delete obj[i];
          break;
      }
    }
    return obj;
  }

  textChange(event){
    this.setState({about:event.target.value})
  }

  dropChange(key){
      this.setState({Pohlaví:key})
      this.clickSave(key);
  }

  save(key, val){
    this.setState({[key]:val});
  }

  clickSave(key){
    const regData = {
        city: this.state.Město,
        marital_status : this.state.Stav,
        birth_date : this.state.birth_date,
        gender: key || this.state.Pohlaví,
        height: this.state.Výška,
        weight: this.state.Váha,
        profession: this.state.Povolání,
        aboutMe: this.state.about,
      };

    api.put('/Customers/'+this.customerId+'/profile', regData)
      .then((response) => {
        console.log("success",response);
      })
      .catch(error => {
        console.log(error);
        const { response } = error;
        const { errors } = response.data.error.details;

        this.setState({ errors });
      });
  }

  render() {

    if(this.isLoaded){
      var profile = this.state.profile;
      var opts = {};
      opts['readOnly'] = this.state.inputState;
      const { btnText } = this.state;

      return (
        <div>
          <h3>Můj Profil</h3>
          <br></br>
          <Form>
            {profile.map((profil) =>
              <ProfileInput type={profil.type || "text"} name={profil.key} save={(key, val) => this.save(key, val)} click={(key, val) => this.clickSave(key, val)} value={profil.val}></ProfileInput>
            )}
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <ButtonGroup>
                <DropdownButton onSelect={this.dropChange} title={this.state.Pohlaví} id="bg-nested-dropdown">
                  <MenuItem eventKey="Muž">Muž</MenuItem>
                  <MenuItem eventKey="Žena">Žena</MenuItem>
                </DropdownButton>
              </ButtonGroup>
            </div>
            <FormGroup controlId="formControlsTextarea">

              <ControlLabel><h4>O mě</h4></ControlLabel>
              <FormControl rows="5" style={{resize:"vertical"}} {...opts} componentClass="textarea" value={this.state.about} onChange={this.textChange}/>

              <div style={{position: "relative",width: "100%"}}>
                <Button onClick={this.handleClick} style={{position: "absolute",right: "10px",top: "-43px"}} ><span className={"glyphicon glyphicon-"+btnText}></span></Button>
              </div>
            </FormGroup>

          </Form>

        </div>
      );
    } else {
      return (
        <div><h1>Loading...</h1></div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer
  }
}

export default connect(mapStateToProps, { userLogged })(ProfileForm)
