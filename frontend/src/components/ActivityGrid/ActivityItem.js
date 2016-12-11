import React, { Component } from 'react';
import { Link } from 'react-router';
import { Thumbnail, Button } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';

// import { AttendActivityButtonContainer } from '../ActivityGrid/AttendActivityButton.js';
// import { ViewActivityButtonContainer } from '../ActivityGrid/ViewActivityButton.js';

export class ActivityItem extends Component {

  renderName () {
    var name = this.props.activity.name
    var shortName = `${name.substring(0,18)}` + '...'
    if (name.length >= 18 ) {
      return shortName
    }
      else {
        return name
      }
  }

  renderLink (id, parsedName) {
    var name = this.props.activity.name
    var shortName = `${name.substring(0,18)}` + '...'
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
        "http://www.lboro.ac.uk/media/wwwlboroacuk/external/content/research/sti/slide1-image-tablet.png"
      )
      }
    else if (subcategory_id <= 14) {
      return (
        "https://www.magicpay.net/wp-content/uploads/2016/08/Travel-Merchant-Account.png"
      )
    }
    else if (subcategory_id <= 20) {
      return (
        "http://ajapaworld.com/wp-content/uploads/2016/08/keep-calm-and-play-board-games-7.png"
      )
    }
    else {
      return (
        "https://aos.iacpublishinglabs.com/question/aq/700px-394px/long-hockey-game_1a13f0def153b9f0.jpg?domain=cx.aos.ask.com"
      )
    }
  }

  render() {

    const { activity } = this.props;
    const { id, name, city, date_and_time, subcategory_id } = activity;
    const parsedName = this.renderName();
    const generatedLink = this.renderLink(id, parsedName);
    var date = new Date(date_and_time);
    var parsedDate = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();

    return (
      <Thumbnail src={this.chooseThumbnail(subcategory_id)} alt="242x200">
        <h3>
          <Link to={`/activityDetail/${id}`} id="test">{name}</Link>
          <ReactTooltip place="top"  type="info" effect="float" />
        </h3>
        <p>Město: <span className="city">{city}</span></p>
        <p>Datum: <span className="date">{parsedDate}</span></p>
        <p>
          <Button bsStyle="primary">Attend</Button>&nbsp;
          <Link className="btn btn-default" to={`/activityDetail/${id}`} role="button">View</Link>
          {/* <AttendActivityButtonContainer activity={activity} />
          <ViewActivityButtonContainer activity={activity} /> */}
        </p>
      </Thumbnail>
    );
  }
}
