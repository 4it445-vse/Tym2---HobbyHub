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

  // componentWillMount() {
  //   const { Participants } = this.state.PArticipants;
  //
  //   var Participants = []
  //   console.log('subs')
  //   console.log(Subscribers)
  //   Subscribers.forEach((subsObj)=> {
  //     api(`Customers/${subsObj.customer_id}`
  //     ).then((response) => {
  //       console.log('customer')
  //       console.log(response.data)
  //       Participants.push(response.data)
  //     });
  //       this.setState({Participants: Participants})
  //   });
  //
  // }

  componentDidMount(){

    console.log('list')
    console.log(this.state.Subscribers)
    var Subscribers = this.state.Subscribers
    var Participants = []

    if (Subscribers != []){
      Subscribers.map(subObj => {
        console.log('jeden sub obj')
        console.log(subObj)
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
      console.log('participants done')

      console.log(Participants)

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
