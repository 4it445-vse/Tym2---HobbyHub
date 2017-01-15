import React, { Component } from 'react';
import { Link } from 'react-router';

import api from '../../api.js';

export class UserActivities extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activitiesUserOrganizes: [],
      activitiesUserAttends: [],
      activitiesUserAttended: []
    }
  }

  componentDidMount(){
    api('/Customers/'+this.props.customerId+'/activities').then((response) => {
      this.setState({
          ...this.state,
          activitiesUserOrganizes: response.data
      })
    })
    api('/Customers/'+this.props.customerId+'/CustomerActivities').then((response) => {
      let activitiesUserAttends = []
      let activitiesUserAttended = []
      let today = new Date().getTime()

      for (let activity of response.data) {
        let activityDate = new Date(activity.date_and_time).getTime()

        if(today < activityDate){
          activitiesUserAttends.push(activity)
        } else {
          activitiesUserAttended.push(activity)
        }
      }

      this.setState({
          ...this.state,
          activitiesUserAttends: activitiesUserAttends,
          activitiesUserAttended: activitiesUserAttended
      })
    })
  }

  _renderActivities(header, activities){
    if(activities.length === 0){
      return null
    }
    return (
      <div>
        <h3>{header}</h3>
        {activities.map( activity => {
          return (
            <Link to={"/activityDetail/" + activity.id}>
              <h4>{activity.name}</h4>
            </Link>
          )
        })}
      </div>
    )
  }

  render() {
    const {
      activitiesUserOrganizes,
      activitiesUserAttends,
      activitiesUserAttended
    } = this.state

    return (
      <div>
        <br/>
        {this._renderActivities("Aktivity, které organizuji", activitiesUserOrganizes)}
        {this._renderActivities("Aktivity, na které jsem přihlášen", activitiesUserAttends)}
        {this._renderActivities("Aktivity, kterých jsem se zúčastnil", activitiesUserAttended)}
      </div>
    )
  }
}
