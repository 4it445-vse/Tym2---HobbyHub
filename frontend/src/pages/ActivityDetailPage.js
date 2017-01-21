import React, {Component} from 'react';
import api from '../api.js';
import { ParticipantList } from '../components/ParticipantList/ParticipantList.js';
import {  Grid, Col, Row, Thumbnail } from 'react-bootstrap';

import { AttendButton } from '../components/Activity/AttendButton.js'
import { Comments } from '../components/Activity/Comments.js'
import { UserSearching } from '../components/UserSearching/UserSearching.js'
import $ from 'jquery';
import './ActivityDetailPage.css'

//import { loadState } from  '../store/localState'

//var dateFormat = require('dateformat');

import { connect } from 'react-redux';
import { userLogged } from '../actions'

import { Map, Marker, InfoWindow } from 'google-maps-react'

const categories = {
  1: 'Sport',
  2: 'Hry',
  3: 'Cestování',
  4: 'Jiné'
}

const subcategories =
  { 1: 'Fotbal' ,
  2: 'Floorbal' ,
   3: 'Basketball' ,
4: 'Volejbal' ,
5: 'Házená' ,
6: 'Nohejbal' ,
7: 'Tenis' ,
8: 'Squash' ,
9: 'Jiné' ,
10: 'Počítačové' ,
11: 'Stolní společenské' ,
12: 'Deskovky' ,
13: 'Jiné' ,
14: 'Rekreační turistika' ,
15: 'Horská turistika' ,
16: 'Zahraniční turistika' ,
17: 'Vandr',
18: 'Památky' ,
19: 'Jiné' ,
20: 'Jiné' ,
};


export class ActivityDetailPageRaw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: null,
      Subscribers: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
    this.props.userLogged(true)

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
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

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  render() {
    const { activityId } = this.props.params;
    const { activity, Subscribers } = this.state;
    if (!activity) {
      return <div>Loading...</div>;
    }

    var mapHeight = $(window).height()/2;
  //  var buttonTop = $(window).height()/3;

    const {
      name,
      about,
      city,
      date_and_time,
      user_count,
      address,
      subcategory_id,
      category_id,
      lat,
      lng
    } = activity;

    var date = new Date(date_and_time);
    var parsedDate = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
    var parsedTime = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})

        return (
            <Grid>
              <Row>
                <Col xs={4}>
                  <h1>{name}</h1>
                  <h2>Popis</h2>
                  <p>{about}</p>

                  <br/>
                  <br/>
                  <h2>Informace</h2>

                  <div><h5>Kategorie:</h5>{categories[category_id] + ' - ' + subcategories[subcategory_id]}</div>
                  <div><h5>Datum konání:</h5>{parsedDate}</div>
                  <div><h5>Čas:</h5>{parsedTime}</div>
                  {/* <div><h5>Datum:</h5> {dateFormat(date_and_time, "dddd, mmmm dS, yyyy")}</div>
                  <div><h5>Čas:</h5>   {dateFormat(date_and_time, "h:MM:ss TT")}</div> */}
                </Col>
                <Col xs={8}>
                  <h2>Místo konání</h2>
                  {(activity.lat && activity.lng) ?

                    <Map google={window.google} zoom={15}
                      containerStyle={{width: '100%', height: mapHeight+'px'}}
                      onClick={this.onMapClicked}
                      initialCenter={{lat: lat, lng: lng}}
                      center={{lat: lat, lng: lng}}>

                      <Marker
                        name={'Test'}
                        onClick={this.onMarkerClick}
                        position={{lat: lat, lng: lng}} />

                      <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                          <div><h5>Místo:</h5> {city}</div>
                          <div><h5>Ulice:</h5> {address}</div>
                        </div>
                      </InfoWindow>

                    </Map>

                    :
                    <Thumbnail>
                      <h3>Mapa nedostupná!</h3>
                      <div><h5>Místo:</h5> {city}</div>
                      <div><h5>Ulice:</h5> {address}</div>
                    </Thumbnail>
                  }

                </Col>
              </Row>

              <Row>
                {/* <UserSearching/> */}
              </Row>
              <Row>
                <Col xs={12}>
                  <h2>Účastníci {Subscribers.length} / {user_count}

                  </h2>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  {(Subscribers.length === 0 || !activity) ?
                    <div>Loading...</div> :
                    <ParticipantList Subscribers={Subscribers}/>
                  }
                  {/* <div className="vertical-cen" style={{'paddingTop': {buttonTop}}}> */}
                   <AttendButton activity={activity}
                    subBsStyle="primary"
                    subClassName="glyphicon glyphicon-plus btn-circle-huge btn-vertical-center"
                    unsubBsStyle="info"
                    unsubClassName="glyphicon glyphicon-minus btn-circle-huge btn-vertical-center"/>
                    {/* </div> */}
                   </Col>
                   </Row>

                   <Row>
                     <Col xs={12}>
                       <UserSearching activityId={activityId}/>
                      </Col>
                   </Row>

                   <Row>
                     <Col xs={12}>
                       <Comments commentedActivityId={activityId}/>
                     </Col>
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
