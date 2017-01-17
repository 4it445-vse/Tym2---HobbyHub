import React, { Component } from 'react'

import './RegistrationPage.css';
import { connect } from 'react-redux';
import { userLogged } from '../actions'
import api from '../api.js';
import './Select.css';

var NotificationSystem = require('react-notification-system');

const bgImage = require('../img/Rock-climbing-Wallpaper.jpg')

class CreateActivityCommentPageRaw extends Component {

  constructor(props) {
    super(props);
    this.state = {
      commentText: ""
    }
    this.props.userLogged(true);
    this._onSubmit = this._onSubmit.bind(this);
    this._onChange = this._onChange.bind(this);
    this._addNotification = this._addNotification.bind(this);
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

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  _onSubmit(event) {
    event.preventDefault();
    let { activityId } = this.props.params

    let reqData = {
      activity_id: parseFloat(activityId),
      text: this.state.commentText
    }

    api.post('/ActivityHasComments/createComment', reqData).then(() => {
      this._addNotification("success", event);
      setTimeout(() => {
        this.props.history.push('/activityDetail/'+activityId)
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
    return (
      <div className="container-fluid" style={imgStyle}>
        <div className="row main">
          <div className="main-login main-center">
            <h2 className="title">Vytvořit komentář</h2>
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

export default connect(mapStateToProps, { userLogged })(CreateActivityCommentPageRaw)
