import React, { Component } from 'react';
import { Col } from 'react-bootstrap'; //Row

import { ParticipantListItem } from './ParticipantListItem.js';
import api from '../../api.js';

export class ParticipantList extends Component {

constructor(props){
  super(props);
  var Subscribers = this.props
  this.state = {
    Subscribers: Subscribers.Subscribers,
    Participants: [],
  };
}

  componentDidMount(){

    var Subscribers = this.state.Subscribers
    var Participants = []

    if (Subscribers !== []){
      Subscribers.map(subObj => {

        api(`Customers/${subObj.customer_id}`
        ).then((customerResponse) => {
          Participants.push(customerResponse.data)
          this.setState({Participants: Participants})
        })
        return subObj
      });

      }
    }

  render() {

    if (this.state.Participants.length === 0){
      return (
        <div className="participants">
         <div>Loading...</div>
        </div>
      );
    } else {
      return (
        <div className="participants">

        {this.state.Participants.map(participant =>
          <Col xs={6} md={3}  key={participant.id}>
            <ParticipantListItem participant={participant}/>
          </Col>
        )}
        </div>
      );
    }

  }
}
