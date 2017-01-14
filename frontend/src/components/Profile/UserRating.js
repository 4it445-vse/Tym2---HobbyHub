import React, { Component } from 'react';
import Rating from 'react-rating-system';

import api from '../../api.js';

const STAR_ICON = require('../../img/star.png')

export class UserRating extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      editable: true,
    }
    this._onRateUser = this._onRateUser.bind(this)
  }

  componentDidMount(){
    api('/Ratings/'+this.props.customerId+'/average').then((response) => {
      this.setState({
          ...this.state,
          rating: response.data.Sympathy
      })
    })
  }

  _onRateUser(numberOfStars) {
    this.setState({
      ...this.state,
      editable: false
    })
  }

  render() {
    const { rating, editable } = this.state
    return (
      <div>
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
        <br/>
        <br/>
      </div>
    )
  }
}
