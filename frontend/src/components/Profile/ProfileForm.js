import React, { Component } from 'react';

import { Jumbotron, Thumbnail, Grid, Button, Col, Row } from 'react-bootstrap';

import { ProfileInput } from '../Profile/ProfileInput.js';

export class ProfileForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      test:"aaaaaa",
    }
  }

  componentWillMount(){
    /*api.get('Customers/6')
      .then(({ data }) => {

        if (data){

        }
      })
      .catch(error => {
        console.log(error);
        const { response } = error;
        const { errors } = response.data.error.details;

        this.setState({ errors });
      });*/
  }

  onChange(event){
    console.log("event---",event);
    //this.setState({value:event.})
  }

  render() {
    const profile = [
      {'name':'Pavel'},
      {'surname':'Novák'}
    ];

    const { test } = this.state;


    return (
      <div>
        {profile.map(() =>
          <ProfileInput name={profile}></ProfileInput>
        )}
      </div>

      //{profile.map(() => (
        );
    }
}
