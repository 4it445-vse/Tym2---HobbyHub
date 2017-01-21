import React, { Component } from 'react';
import { Link } from 'react-router';
import { Thumbnail } from 'react-bootstrap';

import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import api from '../../api.js';

// import { ShowPArticipantDetailButtonContainer } from '../Activity/ShowParticipantDetailtButton.js';
// const tempImage = require('../../img/dummy_participant.jpg') // TODO placeholder


export class ParticipantListItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      userId: this.props.participant.id,
      isShowingModal: false,
      city: null,
      marital_status:  null,
      birth_date:  null,
      gender:  null,
      height:  null,
      weight: 0,
      profession:  null,
      aboutMe:  null,
      info: {},
    }
     this.handleClick = this.handleClick.bind(this);
     this.handleClose = this.handleClose.bind(this);

  }

  componentDidMount(props){
    api(`/profiles?filter={"where":{"customer_id":${this.state.userId}}}`
    ).then((response) => {
      console.log('response')
      console.log(response)
      console.log(response.data)
      var data = response.data[0]
      console.log(data)
      this.setState({
        city: data.city,
        marital_status:  data.marital_status,
        birth_date:  data.birth_date,
        gender:  data.gender,
        height:  data.height,
        weight: data.weight,
        profession:  data.profession,
        aboutMe:  data.aboutMe,
      })
      this.setState({info: response.data})
      console.log('state')
      console.log(this.state)

    }).catch((data) => {
      console.log(data)
    })
  }

  handleClick(e){
    this.setState({isShowingModal: true});
  }

  handleClose(e){
    this.setState({isShowingModal: false});
  }


  render() {
    const { isShowingModal } = this.state
    const { participant } = this.props;

    const { username } = participant; //title, price, shortInfo, userImage,

    var date = new Date(this.state.birth_date);
    var parsedDate = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();

    return (
      <div>
      {isShowingModal ?
        <ModalContainer onClose={this.handleClose}>
          <ModalDialog onClose={this.handleClose}>
            <h1>{username}</h1>
            <p>Bydliště:      {this.state.city}</p>
            <p>Rodinný stav:   {this.state.marital_status}</p>
            <p>Datum narození: {parsedDate}</p>
            <p>Pohlaví:        {this.state.gender}</p>
            <p>Výška:          {this.state.height}</p>
            <p>Váha:           {this.state.weight}</p>
            <p>Povolání:       {this.state.profession}</p>
            <p>O mě:           {this.state.aboutMe}</p>
          </ModalDialog>
        </ModalContainer>
        :
        null
      }

      <Thumbnail src={require(`../../img/avatar_${Math.floor(Math.random() * 6) + 1}.jpg`)} alt="60x50">
        <h3><Link onClick={this.handleClick}>{username}</Link></h3>
      </Thumbnail>
      </div>
    );
  }
}
