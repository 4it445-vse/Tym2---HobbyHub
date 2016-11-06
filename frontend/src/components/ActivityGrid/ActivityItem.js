import React, { Component } from 'react';
import { Link } from 'react-router';
import { Thumbnail } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';

import { AttendActivityButtonContainer } from '../ActivityGrid/AttendActivityButton.js';
import { ViewActivityButtonContainer } from '../ActivityGrid/ViewActivityButton.js';

export class ActivityItem extends Component {
  render() {
    const { activity } = this.props;
    const { id, title, shortInfo } = activity;
    return (

      <Thumbnail src="http://www.shop-samolepky.cz/out/pictures/1/tenis6(1).png" alt="242x200">

          <h3>{ title }</h3>
          <p>{ shortInfo }</p>
          <p>
              <AttendActivityButtonContainer activity={activity} />&nbsp;
              <ViewActivityButtonContainer activity={activity} />
          </p>
      </Thumbnail>
    );
  }
}
