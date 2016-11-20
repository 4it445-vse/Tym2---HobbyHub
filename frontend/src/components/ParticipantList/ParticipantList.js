import React, { Component } from 'react';

import { ParticipantListItem } from './ParticipantListItem.js';

export class ParticipantList extends Component {
  render() {
    const { participants } = this.props;

    return (
      <div className="participants">
      <Col xs={5} md={3}>
        {participants.map(participant =>
          <ParticipantListItem participant={participant} key={participant.id}/>
        )}
        </Col>
      </div>
    );
  }
}
