import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';

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

    if (Subscribers != []){
      Subscribers.map(subObj => {

        api(`Customers/${subObj.customer_id}`
        ).then((customerResponse) => {
          // console.log('participant')
          // console.log(customerResponse.data)
          Participants.push(customerResponse.data)
          // console.log('participants loop')
          // console.log(Participants)
          this.setState({Participants: Participants})
        })
      });

      }
    }

  render() {
    const { Subscribers } = this.props;

    return (
      <div className="participants">
      {this.state.Participants.length === 0 ?
       <div>Loading...</div> :
       <Col xs={5} md={3}>
         {this.state.Participants.map(participant =>
           <ParticipantListItem participant={participant} key={participant.id}/>
         )}
         </Col>

     }
     </div>
    );
  }
}
