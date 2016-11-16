import React, { Component } from 'react';
import { Link } from 'react-router';
import { Thumbnail } from 'react-bootstrap';
import { Jumbotron,  Grid, Button, Col, Row } from 'react-bootstrap';


import { AttendActivityButtonContainer } from '../ActivityGrid/AttendActivityButton.js';
import { ViewActivityButtonContainer } from '../ActivityGrid/ViewActivityButton.js';

export class ActivityItem extends Component {
  render() {
    const { activity } = this.props;
    const { id, name, about, city } = activity;
    return (
      <Thumbnail src="https://www.ticketstream.cz/tsp/static/czech/cs/partnership/images/16.png" alt="242x200">
       <h2>
        <Link to={`/activityDetail/${id}`}>{name}</Link>
      </h2>
      <p>Město: <span className="city">{city}</span></p>
      <p>{about}</p>
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
