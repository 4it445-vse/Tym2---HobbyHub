import React, { Component } from 'react';

import { ActivityItem } from './ActivityItem.js';

export class ProductList extends Component {
  render() {
    const { ActivityItems } = this.props;

    return (
      <div className="products">
        {ActivityItems.map(ActivityItem =>
          <ActivityItem ActivityItem={ActivityItem} key={ActivityItem.id}/>
        )}
      </div>
    );
  }
}
