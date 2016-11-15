import React, { Component } from 'react';

import { ActivityItem } from './ActivityItem.js';
import { Thumbnail, Grid, Button, Col, Row } from 'react-bootstrap';
import { CSSGrid, measureItems, makeResponsive, layout, SpringGrid } from 'react-stonecutter';

const Gridder = makeResponsive(measureItems(CSSGrid), {
  maxWidth: 1920,
  minPadding: 100
});

export class ProductList extends Component {
  render() {
    const { ActivityItems } = this.props;

    return (
    );
  }
}
