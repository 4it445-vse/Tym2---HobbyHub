import React, { Component } from 'react';
import Rating from 'react-rating-system';

import api from '../../api.js';

const STAR_ICON = require('../../img/star.png')

export class UserRating extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      editable: true
    }
    this._onRateUser = this._onRateUser.bind(this)
    this._loadRating = this._loadRating.bind(this)
  }

  componentDidMount(){
    this._loadRating()
  }

  _loadRating(){
    api('/Ratings/'+this.props.customerId+'/average').then((response) => {
      this.setState({
        ...this.state,
        rating: response.data.Sympathy
      })
    })
  }

  _onRateUser(numberOfStars) {
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
    return (
      <div>
        <h3>Mé hodnocení</h3>
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
        <br/><br/><br/>
        <h3>Napsali o mně</h3>
      </div>
    )
  }
}
