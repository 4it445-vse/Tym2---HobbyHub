import React, { Component } from 'react';

import { ActivityItem } from './ActivityItem.js';

export class ActivityGrid extends Component {
  render() {
    const { Activities } = this.props;

    return (
      <div>
        { Activities.map(activity =>
          <ActivityItem activity={ activity } key={ activity.id }/>
        ) }
      </div>
    );
  }
}
