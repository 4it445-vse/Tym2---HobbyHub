import React, {Component} from 'react';
import lodash from 'lodash';
import $ from 'jquery';
import api from '../api.js';
import { ParticipantList } from '../components/ParticipantList/ParticipantList.js';
import { Thumbnail, Grid, Button, Col, Row } from 'react-bootstrap';

var dateFormat = require('dateformat');

import { connect } from 'react-redux';
import { userLogged } from '../actions'

const IMAGE_3 = 'http://www.pixelstalk.net/wp-content/uploads/2016/09/Adventure-HD-Wallpaper.jpg'

import classNames from 'classnames';

export class ActivityDetailPageRaw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: null,
      Participants: [],
      Subscribers: [],
      // Customers: [],
    };
    this.props.userLogged(true)
  }

  componentWillMount() {
    const { activityId } = this.props.params;
    var Owner_id = null
    api(`Activities/${activityId}`
    ).then((response) => {
      this.setState({ activity: response.data });
    })

    var Subscribers = []
    var Participants = []
    api(`hasActivities?filter={"where":{"activity_id":${activityId}}}`
    ).then((response) => {
      Subscribers = (response.data)
      Subscribers.push({activity_id: activityId, customer_id: this.state.activity.customer_id})
      this.setState({Subscribers: Subscribers})
    })




    // console.log('subs')
    // console.log(Subscribers)
    // Subscribers.forEach((subObj) => {
    //   api(`Customers/${subObj.customer_id}`
    //   ).then((customerResponse) => {
    //     console.log('participant')
    //     console.log(customerResponse.data)
    //     Participants.push(customerResponse.data)
    //   });
    // });
    // console.log('participants')
    // console.log(Participants)
    // this.setState({Participants: Participants})

  }

  render() {
    console.log(this.state)
    const { activity, Subscribers, Participants } = this.state;
    if (!activity) {
      return <div>Loading...</div>;
    }

    const {
      id,
      name,
      about,
      city,
      date_and_time,
      user_count,
      address,
    } = activity;

        return (
            <Grid>
            <Row>
            <Col>
                <h1>{name}</h1>
                </Col>
                </Row>

                   <Row>
                   <Col xs={4} md={6}>

                   <h2>Popis</h2>
                   <p>{about}</p>

                  <br/>
                  <br/>
                  <h2>Kdy a kde?</h2>

                    <p><h5>Místo:</h5> {city}</p>
                    <p><h5>Ulice:</h5> {address}</p>
                    <p><h5>Datum:</h5> {dateFormat(date_and_time, "dddd, mmmm dS, yyyy")}</p>
                    <p><h5>Čas:</h5>   {dateFormat(date_and_time, "h:MM:ss TT")}</p>

                   </Col>

                   <Col xs={4} md={6}>
                     <Thumbnail src="http://www.canterburyicehockey.com.au/wp-content/themes/canterbury-ice-hockey/library/images/default-post-image.jpg" alt="242x200">

                     </Thumbnail>
                   </Col>
                   </Row>
                   <Row>

                   </Row>
                   <Row>
                     <h2>Účastníci {Subscribers.length} / {user_count}</h2>
                   </Row>
                   <Row>
                   {Subscribers.length === 0 ?
                    <div>Loading...</div> :
                    <ParticipantList Subscribers={Subscribers}/>
                  }
                   </Row>

                 </Grid>

        );
    }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer
  }
}

export default connect(mapStateToProps, { userLogged })(ActivityDetailPageRaw)
