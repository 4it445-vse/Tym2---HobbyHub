import React, { Component } from 'react'

import './RegistrationPage.css';
import { connect } from 'react-redux';
import { userLogged } from '../actions'
import api from '../api.js';
import './Select.css';

import Rating from 'react-rating-system';

import { loadState } from '../store/localState.js'

var NotificationSystem = require('react-notification-system');

const bgImage = require('../img/Rock-climbing-Wallpaper.jpg')
const STAR_ICON = require('../img/star.png')

import { browserHistory } from 'react-router'

class CreateProfileCommentPageRaw extends Component {

  constructor(props) {
    super(props);
    this.state = {
      commentText: "",
      rating: 0,
      editable: true, //this.props.customerId !== this.loggedUserId // prevent self-vote
      userAlreadyVoted: false
    }
    this.props.userLogged(true);
    this._onSubmit = this._onSubmit.bind(this);
    this._onChange = this._onChange.bind(this);
    this._addNotification = this._addNotification.bind(this);

    this.userAlreadyVoted = false
    this.loggedUserId = loadState().auth.userId;
    this._onRateUser = this._onRateUser.bind(this)
    this._preventRepeatedVote = this._preventRepeatedVote.bind(this)
    this._preventRepeatedVote()
  }

  _notificationSystem: null;

  _addNotification(cause, event) {
    event.preventDefault();
    switch (cause) {
      case "success":
        this._notificationSystem.addNotification({
          title: 'Success!',
          message: 'Komentář byl vytvořen!',
          level: 'info'
        });
        break;
      case "error":
        this._notificationSystem.addNotification({
          title: 'Chyba!',
          message: 'Během komentování došlo k chybě!',
          level: 'error'
        });
        break;
      default:
    }
  }

  componentWillMount() {
    if(this.state.editable) {
      this._preventRepeatedVote()
    }
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  _preventRepeatedVote(){
    let reqData = {
      id: this.props.params.customerId
    }
    api('/Ratings/'+this.loggedUserId+'/status', reqData).then((response) => {
      var voted = (typeof response.data !== 'boolean')
      this.userAlreadyVoted = voted
      this.setState({userAlreadyVoted: voted})
    })
  }

  _onRateUser(numberOfStars) {
    if(this.userAlreadyVoted){ return null }
    let reqData = {
      sympathy: numberOfStars,
      user_id: parseInt(this.props.params.customerId),
    }
    api.post('Ratings/vote', reqData).then(() => {
      this.setState({
        ...this.state,
        editable: false,
        rating: numberOfStars
      })
    })
  }

  _onSubmit(event) {
    event.preventDefault();

    let reqData = {
      to_user_id: parseFloat(this.props.params.customerId),
      text: this.state.commentText
    }

    api.post('/CustomerHasComments/createComment', reqData).then(() => {
      this._addNotification("success", event);
      setTimeout(() => {
        browserHistory.goBack()
      },1500)
    }).catch(error => {
      this._addNotification("error", event);
    })
  }

  _onChange(e){
    this.setState({commentText: e.target.value})
  }

  render() {
    let imgStyle = {
        backgroundImage: 'url(' + bgImage + ')',
        backgroundSize: 'cover'
    }

    const { rating, editable } = this.state
    return (
      <div className="container-fluid" style={imgStyle}>
        <div className="row main">
          <div className="main-login main-center">
          <h3>Ohodnotit uživatele</h3>
        {this.state.userAlreadyVoted ?
          <p>Tohoto uživatele jste již ohodnotil(a)</p>
          :
          <div>
          <Rating
            callback={this._onRateUser}
            initialValue={rating}
            editable={true}
            lockRating={false}
            image={STAR_ICON}
            fillBG="#f1c40f"
            initialBG="#6a6a6a"
            numberStars={5}
            containerStyle={{ maxWidth: '200px' }}
          />
          </div>
        }
            <h3 className="title">Vytvořit komentář</h3>
            <form className="form-horizontal" method="post" onSubmit={this._onSubmit}>
              <div className="form-group">
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
                    <textarea required className="form-control" rows="5" onChange={this._onChange} name="comment" id="comment"></textarea>
                  </div>
                </div>
              </div>
              <div className="form-group ">
                <button type="submit" className="btn btn-primary btn-lg btn-block">Vytvořit</button>
              </div>
            </form>
            <div>
              <NotificationSystem ref="notificationSystem"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer
  }
}

export default connect(mapStateToProps, { userLogged })(CreateProfileCommentPageRaw)
