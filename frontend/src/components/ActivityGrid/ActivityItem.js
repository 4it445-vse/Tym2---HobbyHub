import React, { Component } from 'react';
import { Link } from 'react-router';
import { Thumbnail } from 'react-bootstrap';
import { AttendButton } from '../Activity/AttendButton.js'

export class ActivityItem extends Component {

constructor(props){
  super(props);
  this.state = {
    canSubscribe: true,
  };
}

  renderName () {
    var name = this.props.activity.name
    var shortName = `${name.substring(0,18)}...`
    if (name.length >= 18 ) {
      return shortName
    }
      else {
        return name
      }
  }

  renderLink (id, parsedName) {
    var name = this.props.activity.name
    if (name.length >= 18 ) {
      return (
        <Link to={`/activityDetail/${id}`} data-tip={name} id="test">{parsedName}</Link>
      )
    }
      else {
        return (
          <Link to={`/activityDetail/${id}`} id="test">{parsedName}</Link>
        )
      }
  }

  chooseThumbnail (subcategory_id) {

    if (subcategory_id < 0) {
    }
    else if (subcategory_id <= 10){
      return (
        "http://www.prideindiversity.com.au/content/uploads/2016/02/Shoe.png"
      )
      }
    else if (subcategory_id <= 14) {
      return (
        "https://www.magicpay.net/wp-content/uploads/2016/08/Travel-Merchant-Account.png"
      )
    }
    else if (subcategory_id <= 20) {
      return (
        "http://sd.keepcalm-o-matic.co.uk/i/keep-calm-and-play-board-games-18.png"
      )
    }
    else {
      return (
        "http://www.sonedesign.jp/img_main/unknown_01.jpg"
      )
    }
  }

  render() {

    const { activity } = this.props;
    const { logged } = this.props;
    const { id, name, city, date_and_time, subcategory_id } = activity; //, customer_id
    var date = new Date(date_and_time);
    var parsedDate = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
  //  var parsedTime = date.getHours() + ':' + date.getMinutes();
    var parsedTime = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
  //  var user_id = loadState().auth.userId

    return (
      <Thumbnail src={this.chooseThumbnail(subcategory_id)} alt="242x200">
        <h3>
          <Link to={`/activityDetail/${id}`} id="test">{name}</Link>
        </h3>
        <p>Město: <span className="city">{city}</span></p>
        <p>Datum: <span className="date">{parsedDate}</span></p>
        <p>Od: <span className="date">{parsedTime}</span></p>
        <p>
          {logged ?
            <AttendButton activity={activity} subBsStyle="primary" subContent="Přihlásit" unsubBsStyle="info" unsubContent="Odhlásit"/> :
            null
          }&nbsp;
          {/* <AttendButton activity={activity} subBsStyle="primary" subContent="Přihlásit" unsubBsStyle="info" unsubContent="Odhlásit"/>&nbsp; */}
          <Link className="btn btn-default" to={`/activityDetail/${id}`} role="button">Detail</Link>
          {/* <AttendActivityButtonContainer activity={activity} />
          <ViewActivityButtonContainer activity={activity} /> */}
        </p>
      </Thumbnail>
    );
  }
}
