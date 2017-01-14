import React, { Component } from 'react';
import { connect } from 'react-redux';

import {  Button, Form, FormGroup,  FormControl,  ButtonGroup,
  DropdownButton, MenuItem, ControlLabel, Collapse, Well } from 'react-bootstrap'; //Jumbotron, Thumbnail, Grid, Col, Row, InputGroup, Radio,

import { ProfileInput } from '../Profile/ProfileInput.js';

//import { ProfileMultiselect } from '../Profile/ProfileMultiselect.js';

var Multiselect = require('react-bootstrap-multiselect');

//import Datetime from 'react-datetime';

import api from '../../api.js';

import { userLogged } from '../../actions' //isUserLogged, getSession

import { loadState } from '../../store/localState.js'

export class ProfileForm extends Component {
  constructor(props){
    super(props);
    this.customerId = loadState().auth.userId;
    this.textChange = this.textChange.bind(this);
    this.dropChange = this.dropChange.bind(this);
    this.clickSave = this.clickSave.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.clickSavePwd = this.clickSavePwd.bind(this);
    this.multiselectChange = this.multiselectChange.bind(this);
    this.isCreated = true;
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
      about:"",
      myData : [{value:'One',selected:true},{value:'Two'},{value:'Three'},{value:'Four'},{value:'Five'}],
      myHobbies: [],
      newHobbies: [],
      delHobbies: [],
    };
    this.isLoaded = false;
    this.horses = [];
    this.myHobbies = [];
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

      api.get('/Customers/'+this.customerId+'/profile')
        .then((response) => {
          this.isCreated = true;
          var profile = [];
          var data = response.data;

          for(var colName in data){
            var o = {};
            if(colName === "birth_date"){
              o.key = colName;
              o.val = data[colName];
              o.type = "date";
            } else {
              o.key = colName;
              o.val = data[colName];
            }
            profile.push(o);
          }

          profile = this.mapNames(profile);
          this.isLoaded = true;
          this.setState({profile:profile});
        })
        .catch(error => {
          this.isCreated = false;
          var profile = [];
          var data = {
                city:"",
                marital_status:"",
                gender:"",
                height:"",
                weight:"",
                birth_date:"",
                profession:"",
                aboutMe:""
              };

          for(var colName in data){
            if(colName === "birth_date"){
              var o = {};
              o.key = colName;
              o.val = data[colName];
              o.type = "date";
              profile.push(o);
            } else {
              o.key = colName;
              o.val = data[colName];
              profile.push(o);
            }
          }

          profile = this.mapNames(profile);
          this.isLoaded = true;
          this.setState({profile:profile});
        });

      api.get('/Interests')
        .then((response) => {

          var data = [];
          for(var i = 0; i<response.data.length; i++){
            data[i]={
              value:response.data[i].interest,
              id:response.data[i].id
            };
          }
          this.horses = data;

          api.get('/HasInterests/?filter={"where":{"customer_id":'+this.customerId+'}}')
          .then((response) => {
            //this.myHobbies = response;
            const data = response.data;
            //this.myHobbies = data;
            for(var i=0;i<response.data.length;i++){
              var id = response.data[i].interest_id - 1;
              this.horses[id].selected = true;
            }
            this.setState({myHobbies:data});
          })
          .catch(error => {
            const { response } = error;
            const { errors } = response.data.error.details;

            this.setState({ errors });
          });
        })
        .catch(error => {
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
          if(obj[i].val){
            var oldDate = obj[i].val.split("-");
            var day = oldDate[2].substring(0,2);
            obj[i].val = oldDate[0] + "-" + oldDate[1] + "-" + day;
            this.setState({[obj[i].key]:obj[i].val});
          } else {
            obj[i].val = "";
            this.setState({[obj[i].key]:obj[i].val});
          }
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
          default:
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
    if(key === "Datum nar."){
      key = "birth_date";
    }
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

      if(!regData.birth_date) {
        delete regData.birth_date;
      }

      if(this.isCreated){
        //pokud už je profil vytvořen, použije se put
        api.put('/Customers/'+this.customerId+'/profile', regData)
          .then((response) => {
          })
          .catch(error => {
            const { response } = error;
            const { errors } = response.data.error.details;

            this.setState({ errors });
          });
      } else {
        //pokud vytvoře není, použihe se post
        api.post('/Customers/'+this.customerId+'/profile', regData)
          .then((response) => {
          })
          .catch(error => {
            const { response } = error;
            const { errors } = response.data.error.details;

            this.setState({ errors });
          });
      }
  }

  clickSaveEmail(key){
    const regData = {
        newEmail: this.state.Email
      };

    api.put('/Customers/updateEmail', regData)
      .then((response) => {
      })
      .catch(error => {
        const { response } = error;
        const { errors } = response.data.error.details;

        this.setState({ errors });
      });
  }

  clickSavePwd(event){
    event.preventDefault();

    if(this.state.Nové && this.state.Nové.match(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=\S*?[!"$%^&*_]).{8,12})$/g)) {
      const regData = {
          oldPassword: this.state.Staré,
          newPassword: this.state.Nové
        };

      api.put('/Customers/updatePassword', regData)
        .then((response) => {
        })
        .catch(error => {
          const { response } = error;
          const { errors } = response.data.error.details;

          this.setState({ errors });
        });
    }
  }

  multiselectChange(event){
    var id = "";

    //získám ID zájmu
    for(var i = 0; i<this.horses.length; i++){
      if(this.horses[i].value === event[0].value){
        id = this.horses[i].id;
      }
    }

    if(event[0].selected){
      var horseData = {
        customer_id:this.customerId,
        interest_id:id
      };

      var currentHobbies = this.state.myHobbies;

      api.post('/HasInterests/replaceOrCreate', horseData)
        .then((response) => {
          currentHobbies.push(response.data);
          this.setState({myHobbies: currentHobbies});

        })
        .catch(error => {
          const { response } = error;
          const { errors } = response.data.error.details;

          this.setState({ errors });
        });

    } else {
      var relId;
      var updatedHobbies = this.state.myHobbies;

      for(var a = 0; a<updatedHobbies.length; a++){
        if(updatedHobbies[a].interest_id === id){
          relId = updatedHobbies[a].id;
          updatedHobbies.splice([a],1);
        }
      }

      api.delete('/HasInterests/'+relId)
        .then((response) => {
          //console.log("DELETED::", response);
        })
        .catch(error => {
          const { response } = error;
          const { errors } = response.data.error.details;

          this.setState({ errors });
        });
    }
  }

  render() {
    if(this.isLoaded && this.customerId){
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
              <ProfileInput type={profil.type || "text"} name={profil.key} save={(key, val) => this.save(key, val)}
                click={(key, val) => this.clickSave(key, val)} value={profil.val}></ProfileInput>
            )}

            <table width="100%">
              <tbody>
                <tr>
                  <td style={{
                    width: "100px",
                    overflow: "hidden",
                    display: "inline-block",
                    whiteSpace: "nowrap"
                  }}><h4>Koníčky:</h4></td>
                  <td width="100%">
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                      <Multiselect data={this.horses} onChange={this.multiselectChange} multiple />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><h4>Pohlaví:</h4></td>
                  <td>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                      <ButtonGroup>
                        <DropdownButton onSelect={this.dropChange} title={this.state.Pohlaví} id="bg-nested-dropdown">
                          <MenuItem eventKey="Muž">Muž</MenuItem>
                          <MenuItem eventKey="Žena">Žena</MenuItem>
                        </DropdownButton>
                      </ButtonGroup>
                    </div></td>
                </tr>
              </tbody>

            </table>

            <FormGroup controlId="formControlsTextarea">
              <ControlLabel><h4>O mě</h4></ControlLabel>
              <FormControl rows="5" style={{resize:"vertical"}} {...opts} componentClass="textarea" value={this.state.about} onChange={this.textChange}/>
              <div style={{position: "relative",width: "100%"}}>
                <Button onClick={this.handleClick} style={{position: "absolute",right: "10px",top: "-43px"}} >
                  <span className={"glyphicon glyphicon-"+btnText}></span>
                </Button>
              </div>
            </FormGroup>

            <Button onClick={ ()=> this.setState({ open: !this.state.open })}>
              Advanced settings
            </Button>
            <div>&nbsp;</div>
            <Collapse in={this.state.open}>
              <div>

                <ProfileInput type="email"  validate="true" name="Nový Email" save={(key, val) => this.save(key, val)} click={(key, val) => this.clickSaveEmail(key, val)}></ProfileInput>
                <Well>

                  <h2>Změna hesla:</h2>

                  <ProfileInput type="password" noBtn="true" name="Staré"  save={(key, val) => this.save(key, val)} click={(key, val) => this.clickSavePwd(key, val)}>
                  </ProfileInput>
                  <ProfileInput type="password" validate="true" noBtn="true" name="Nové"  save={(key, val) => this.save(key, val)} click={(key, val) => this.clickSavePwd(key, val)}>
                  </ProfileInput>

                  <Button type="submit" onClick={this.clickSavePwd}>
                    Submit
                  </Button>

                </Well>
              </div>
            </Collapse>
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
