import React, {Component} from 'react';
import api from '../api.js';
import { ParticipantList } from '../components/ParticipantList/ParticipantList.js';
import {  Grid, Col, Row } from 'react-bootstrap'; //Thumbnail,

import { AttendButton } from '../components/Activity/AttendButton.js'
import { UserSearching } from '../components/UserSearching/UserSearching.js'

//import { loadState } from  '../store/localState'

var dateFormat = require('dateformat');

import { connect } from 'react-redux';
import { userLogged } from '../actions'

import { Map, Marker } from 'google-maps-react'

export class ActivityDetailPageRaw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: null,
      Subscribers: [],
    };
    this.props.userLogged(true)
  }

  componentDidMount() {
    const { activityId } = this.props.params;
    api(`Activities/${activityId}`
    ).then((response) => {
      this.setState({ activity: response.data });
    }).catch((data) => {
      if (data.response.status === 401){
        this.props.history.push('/login')
      } else {
        console.log('errors')
        console.log(data);
      }
      return false
    })

    api(`hasActivities?filter={"where":{"activity_id":${activityId}}}`
    ).then((response) => {
      this.setState({Subscribers: response.data})
    })

  }

  render() {
    const { activityId } = this.props.params;
    const { activity, Subscribers } = this.state;
    if (!activity) {
      return <div>Loading...</div>;
    }

    const {
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

                    <div><h5>Místo:</h5> {city}</div>
                    <div><h5>Ulice:</h5> {address}</div>
                    <div><h5>Datum:</h5> {dateFormat(date_and_time, "dddd, mmmm dS, yyyy")}</div>
                    <div><h5>Čas:</h5>   {dateFormat(date_and_time, "h:MM:ss TT")}</div>
                   </Col>

                   <Col xs={4} md={6}>
                   <div width='100px' height='100px'>
                   <Map google={window.google} zoom={16} initialCenter={{lat: 50.1129793, lng: 14.614941600000066 + 0.007}}>
{/* {console.log('window')}
{console.log(window.location)} */}
                   <Marker
                    name={'Test'}
                    position={{lat: 50.1129793, lng: 14.614941600000066}} />

                    {/* <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                    </InfoWindow> */}
                    </Map>
                    </div>
                     {/* <Thumbnail src="http://www.canterburyicehockey.com.au/wp-content/themes/canterbury-ice-hockey/library/images/default-post-image.jpg" alt="242x200">

                     </Thumbnail> */}
                   </Col>
                   </Row>
                   <Row>
                   {/* <UserSearching/> */}
                   </Row>
                   <Row>

                     <h2>Účastníci {Subscribers.length} / {user_count}   <AttendButton activity={activity} subBsStyle="success" subClassName="glyphicon glyphicon-plus" unsubBsStyle="danger" unsubClassName="glyphicon glyphicon-minus"/></h2>

                   </Row>
                   <Row>
                   {(Subscribers.length === 0 || !activity) ?
                     <div>Loading...</div> :
                    <ParticipantList Subscribers={Subscribers}/>
                   }
                   </Row>
                   <Row>

                     <UserSearching activityId={activityId}/>

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
