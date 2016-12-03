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

  render() {

    const { activity } = this.props;
    const { id, name, city, date_and_time } = activity;
    const parsedName = this.renderName();
    const generatedLink = this.renderLink(id, parsedName);
    var date = new Date(date_and_time);
    var parsedDate = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();

    return (
      <Thumbnail src="https://www.ticketstream.cz/tsp/static/czech/cs/partnership/images/16.png" alt="242x200">
        <h3>
          { generatedLink }
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
