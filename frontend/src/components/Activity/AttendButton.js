import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
//import ReactTooltip from 'react-tooltip';
import api from '../../api.js';

import { loadState } from  '../../store/localState';

//var ReactDOM = require('react-dom');
//var NotificationSystem = require('react-notification-system');

export class AttendButton extends Component {

  constructor(props){
    super(props);
    this.state = {
      canSubscribe: true,
      registeredUser: true,
    }
    this._addNotification = this._addNotification.bind(this);
    this.handleAttendClick = this.handleAttendClick.bind(this);
    this.handleUnsubClick = this.handleUnsubClick.bind(this);
  }

  _notificationSystem: null;

  _addNotification(cause, event) {
    event.preventDefault();
    switch (cause) {
      case "success":
        this._notificationSystem.addNotification({
          title: 'Success!',
          message: 'Přihlášen!',
          level: 'info'
        });
        break;
      case "error":
        this._notificationSystem.addNotification({
          title: 'Error!',
          message: 'Na akci nebylo možné se přihlásit. Je možné že jste na akci již přihlášen.',
          level: 'error'
        });
        break;
      default:
    }
  }


  handleAttendClick(event){
    event.preventDefault();
        console.log('click')
    console.log(event)
    var activity_id = this.props.activity.id


    api.post(`hasActivities/subscribeToActivity`, {"id": activity_id}

  ).then((data) => {
    if (data){
    // this._addNotification("success", event);
    this.setState({canSubscribe: false});
    window.location = '/activityDetail/' + activity_id
  }else{
    // isUserLogged = data
    this.setState({ errors: {} });
  };

  }).catch(error => {
    // this._addNotification("error", event);
    console.log(error);
    const { response } = error;
    const { errors } = response.data.error;

    this.setState({ errors });
  });
  }

  handleUnsubClick(event){
    event.preventDefault();
    var activity_id = this.props.activity.id
    api.post(`hasActivities/unsubscribeActivity`, {"id": activity_id}
  ).then((data) => {
    if (data){
    // this._addNotification("success", event);
    this.setState({canSubscribe: true});
    if (window.location.pathname.includes('activityDetail')) {
      window.location = '/activityDetail/' + activity_id
    }
  }else{
    // isUserLogged = data
    this.setState({ errors: {} });
  };

  }).catch(error => {
    // this._addNotification("error", event);
    console.log(error);
    const { response } = error;
    const { errors } = response.data.error;

    this.setState({ errors });
  });
  }

  componentWillMount(){
    var activityId = this.props.activity.id
    var user_id = loadState().auth.userId

    api(`hasActivities?filter={"where":{"activity_id":${activityId}, "customer_id":${user_id} }}`
    ).then((response) => {

      if (response.data.length === 0){
      this.setState({canSubscribe: true})
    } else {
      this.setState({canSubscribe: false})
    }
    }).catch((data) => {
      if (data.response.status !== 401){
        this.setState({registeredUser: true})
        return true
      } else {
          this.setState({registeredUser: false})
          return false
      }
    })
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }


  render(){
    const { activity, subBsStyle, subClassName, subContent, unsubClassName, unsubBsStyle, unsubContent } = this.props;
    var user_id = loadState().auth.userId
    var canSubscribe = this.state.canSubscribe
    var registeredUser = this.state.registeredUser

// return(
//   <div>
//     {canSubscribe ? <Button bsStyle="primary" onClick={this.handleSubmit}>Přihlásit</Button> : null}
//   </div>
// )
if (registeredUser){
   if (canSubscribe){
     return(
       <Button className={subClassName} bsStyle={subBsStyle} onClick={this.handleAttendClick}>{subContent}</Button>
     )
   } else {
     if (user_id === activity.customer_id){
       return(
         null
       )
     } else {
       return(
         <Button className={unsubClassName} bsStyle={unsubBsStyle} onClick={this.handleUnsubClick}>{unsubContent}</Button>
       )
     }
   }
 } else {
   return null
   }
  }
}
