import React, { Component } from 'react';
import { Link } from 'react-router';
import { Thumbnail } from 'react-bootstrap';

import { AttendActivityButtonContainer } from '../ActivityGrid/AttendActivityButton.js';
import { ViewActivityButtonContainer } from '../ActivityGrid/ViewActivityButton.js';

export class ActivityItem extends Component {
  render() {
    const { activity } = this.props;
    const { id, name, about, city } = activity;
    return (
      <div className="product">
        <div className="pull-right">
          <AttendActivityButtonContainer activity={activity} />
          <ViewActivityButtonContainer activity={activity} />
        </div>
        <h2>
          <Link to={`/Activities/${id}`}>{name}</Link>
        </h2>
        <p>city: <span className="city">{city}</span></p>
        <p>{about}</p>
      </div>
    );
  }
}
