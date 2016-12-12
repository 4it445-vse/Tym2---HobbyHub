import React, { Component } from 'react';

import { ActivityItem } from './ActivityItem.js';
import { Jumbotron, Thumbnail, Grid, Button, Col, Row } from 'react-bootstrap';

export class ActivityGrid extends Component {
  render() {
    const { Activities } = this.props;

    return (
      <Row>
        { Activities.map(activity =>
          <Col xs={6} md={3}>
          <ActivityItem activity={ activity } key={ activity.id }/>
          </Col>
        ) }
      </Row>
    );
  }
}
