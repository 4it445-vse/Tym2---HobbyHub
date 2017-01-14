import React, { Component } from 'react';
import { Link } from 'react-router';
import { Thumbnail } from 'react-bootstrap';

// import { ShowPArticipantDetailButtonContainer } from '../Activity/ShowParticipantDetailtButton.js';
// const tempImage = require('../../img/dummy_participant.jpg') // TODO placeholder


export class ParticipantListItem extends Component {
  render() {
    const { participant } = this.props;
    const { id, username } = participant; //title, price, shortInfo, userImage, 

    return (
      <Thumbnail src={require(`../../img/avatar_${Math.floor(Math.random() * 6) + 1}.jpg`)} alt="60x50">
        <h3><Link to={`/userDetail/${id}`}>{username}</Link></h3>
      </Thumbnail>

    );
  }
}
