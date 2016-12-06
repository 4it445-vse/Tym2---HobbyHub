import React, { Component } from 'react';

import { InputGroup, FormGroup, FormControl, Button, Input} from 'react-bootstrap';

//import { ProfileInput } from 'ProfileInput.js';

export class ProfileInput extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state={
      inputState:"readOnly",
      btnText:"Edit",
      toggle:""
    }
  //  this.props.userLogged(false);
  }


  handleClick(){
    if (this.state.inputState === 'readOnly'){
      this.setState({
        inputState:"",
        btnText:"Save"
      });
    } else {
      this.setState({
        inputState:"readOnly",
        btnText:"Edit"
      });
      //uložit data z input boxu
    }
  };

  onChange(event){
    //console.log("event---",event.target.value);
    this.setState({value:event.target.value})
  }

  render() {
    console.log("value..",this.state.value);
    var opts = {};
    opts['readOnly'] = this.state.inputState;

    const { name } = this.props;
    const { btnText } = this.state;
    console.log("nameeeee",name);

    return (

        <FormGroup>
          <InputGroup onChange={this.onChange}>
            <FormControl type="text" {...opts} />
            <InputGroup.Button>
              <Button onClick={this.handleClick}>{btnText}</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
        );
    }
}
