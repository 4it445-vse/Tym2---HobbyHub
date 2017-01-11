import React, { Component } from 'react';

import { InputGroup, FormGroup, FormControl, Button } from 'react-bootstrap'; //, Input, Glyphicon

//import { ProfileInput } from 'ProfileInput.js';

export class ProfileInput extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.state={
      inputState:"readOnly",
      btnText:"pencil",
      toggle:"",
    }
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

      this.props.click();
    }
  };

  onChange(event){
    //save the form with updated data
    this.props.save(this.state.name, event.target.value);

    //update the  inpput box
    this.setState({val:event.target.value});

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
    const { btnText } = this.state;

    return (
            <table width="100%">
              <tr>
                <td style={{
                  width: "100px",
                  overflow: "hidden",
                  display: "inline-block",
                  whiteSpace: "nowrap"
                }}><h4>{this.state.name}:</h4></td>
                <td>
                  <FormGroup>
                    <InputGroup onChange={this.onChange} style={{width: "277px"}}>
                      <FormControl type={type} {...opts} value={this.state.val}/>
                      <InputGroup.Button>
                        <Button onClick={this.handleClick}><span className={"glyphicon glyphicon-"+btnText}></span></Button>
                      </InputGroup.Button>
                    </InputGroup>
                  </FormGroup></td>
              </tr>
            </table>
        );
    }
}
