import React, { Component } from 'react';
import { Link } from 'react-router';

import { ShowPArticipantDetailButtonContainer } from '../Activity/ShowParticipantDetailtButton.js';
const tempImage = require('../../img/dummy_participant.jpg') // TODO placeholder


export class ParticipantListItem extends Component {
  render() {
    const { participant } = this.props;
    const { id, title, price, shortInfo, userImage, userName } = participant;
    return (
      <Thumbnail src={tempImage} alt="60x50">
        <h3><Link to={`/userDetail/${id}`}</Link></h3>
      </Thumbnail>

    );
  }
}
