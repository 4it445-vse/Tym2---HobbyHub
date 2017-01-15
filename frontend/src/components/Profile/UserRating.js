import React, { Component } from 'react';
import Rating from 'react-rating-system';
import { Well } from 'react-bootstrap';

import { Comments } from './Comments.js'
import { loadState } from '../../store/localState.js'
import api from '../../api.js';

const STAR_ICON = require('../../img/star.png')

export class UserRating extends Component {

  constructor(props) {
    super(props);
    this.userAlreadyVoted = false
    this.loggedUserId = loadState().auth.userId;
    this._onRateUser = this._onRateUser.bind(this)
    this._loadRating = this._loadRating.bind(this)
    this._preventRepeatedVote = this._preventRepeatedVote.bind(this)
    this.state = {
      rating: 0,
      editable: true // this.props.customerId !== this.loggedUserId // prevent self-vote
    }
    this._preventRepeatedVote()
  }

  componentDidMount(){
    this._loadRating()
    if(this.state.editable) {
      // TODO this._preventRepeatedVote()
    }
  }

  _loadRating(){
    api('/Ratings/'+this.props.customerId+'/average').then((response) => {
      this.setState({
        ...this.state,
        rating: response.data.Sympathy
      })
    })
  }

  _preventRepeatedVote(){
    let reqData = {
      id: this.props.customerId
    }
    api('/Ratings/'+this.loggedUserId+'/status', reqData).then((response) => {
      this.userAlreadyVoted = (typeof response.data !== 'boolean')
    })
  }

  _onRateUser(numberOfStars) {
    console.log(`alreadyVoted`,this.userAlreadyVoted);
    if(this.userAlreadyVoted){ return null }
    let reqData = {
      sympathy: numberOfStars,
      user_id: this.props.customerId
    }
    api.post('Ratings/vote', reqData).then(() => {
      this.setState({
        ...this.state,
        editable: false
      })
      this._loadRating()
    })
  }

  render() {
    const { rating, editable } = this.state
    const { commentedUserId } = this.props
    return (
      <div>
        <h3>Mé hodnocení</h3>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Rating
            callback={this._onRateUser}
            initialValue={rating}
            editable={editable}
            lockRating={true}
            image={STAR_ICON}
            fillBG="#f1c40f"
            initialBG="#6a6a6a"
            numberStars={5}
            containerStyle={{ maxWidth: '200px' }}
          />
        </div>
        <Comments commentedUserId={commentedUserId}/>
      </div>
    )
  }
}
