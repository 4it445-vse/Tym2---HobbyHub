import React, { Component } from 'react';

import { InputGroup, FormGroup, FormControl, Button } from 'react-bootstrap'; //, Input, Glyphicon


import api from '../../api.js';

//import { ProfileInput } from 'ProfileInput.js';

export class ProfileInput extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.pwdComplex = true;
    this.emailValid = true;
    this.state={
      inputState:"readOnly",
      btnText:"pencil",
      toggle:"",
      emailExists:false
    }
  }


  handleClick(){
    if (this.state.inputState === 'readOnly'){
      this.setState({
        inputState:"",
        btnText:"ok"
      });
    } else {
      if(this.emailValid && this.pwdComplex && !this.state.emailExists){
        this.setState({
          inputState:"readOnly",
          btnText:"pencil"
        });
        this.props.click();
      }
    }
  };

  onChange(event){
    console.log(this.props.type);
    if(this.props.type === "password" && this.props.validate){
      if(event.target.value.match(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=\S*?[!"$%^&*_]).{8,12})$/g)) {
        this.pwdComplex = true;
      } else {
        this.pwdComplex = false;
      }
    }

    if(this.props.type === "email" && this.props.validate){
      if (event.target.value.match(/^\w+([^\u0000-\u0080]?[\.!#$%^&*()\-+-]?\w+)*@\S+/g)) {
        this.emailValid = true;
      } else {
        this.emailValid = false;
      }
    }


    //save the form with updated data
    this.props.save(this.state.name, event.target.value);

    //update the  inpput box
    this.setState({val:event.target.value});

  }

  onBlur(event){
    if(this.props.type === "email"){
      api.get('Customers/'+event.target.value+'/findByEmail')
        .then(({ data }) => {
          console.log('data', data);
          if(data){
            //this.emailExists = true;
            this.setState({emailExists:true});
          } else {
            //this.emailExists = true;
            this.setState({emailExists:false});
          }
        })
        .catch(error => {
          console.log(error);
          //this.emailExists = false;
          this.setState({emailExists:false});
        });
    }
  }

  componentWillMount(){
    var {
      name,
      value
     } = this.props;

     if(name==="birth_date"){
       name = "Datum nar.";
     }

     this.setState({
       name:name,
       val:value,
     });
  }

  render() {
    const { type } = this.props;
    var opts = {};
    opts['readOnly'] = this.state.inputState;
    if(this.props.noBtn){
      opts['readOnly'] = "";
    }
    const { btnText } = this.state;

    var valid;
    if(this.pwdComplex && this.emailValid && !this.state.emailExists){
      valid = null
    } else {
      valid = "error"
    }

    var x;
    if(type !== "password"){
       x = <InputGroup.Button>
         <Button onClick={this.handleClick}><span className={"glyphicon glyphicon-"+btnText}></span></Button>
       </InputGroup.Button>;
    }

    return (
          <div>
            <table width="100%">
              <tbody>
                <tr>
                  <td style={{
                    width: "100px",
                    overflow: "hidden",
                    display: "inline-block",
                    whiteSpace: "nowrap"
                  }}><h4>{this.state.name}:</h4></td>
                  <td width="100%">
                    <FormGroup validationState={valid}>
                      <InputGroup onChange={this.onChange}>
                        <FormControl type={type} {...opts} onBlur={this.onBlur} value={this.state.val} />
                        {x}
                      </InputGroup>
                    </FormGroup>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>{this.checkText()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
    }

    checkText(){
      if(!this.pwdComplex)    {
        return (<div>Heslo musí obsahovat: a-z, A-Z, 0-9 a alespoň jeden znak z !"$%^&*_</div>)
      }
      if(!this.emailValid)    {
        return (<div>Zadaný email není validní</div>)
      }
      if(this.state.emailExists) {
        return (<div>Zadaný email již existuje</div>)
      }
    }
}
