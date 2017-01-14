import React, {Component} from 'react';
import api from '../api.js';
import { ParticipantList } from '../components/ParticipantList/ParticipantList.js';
import { Thumbnail, Grid, Col, Row } from 'react-bootstrap';

import { AttendButton } from '../components/Activity/AttendButton.js'
import { UserSearching } from '../components/UserSearching/UserSearching.js'

import { loadState } from  '../store/localState'

var dateFormat = require('dateformat');

import { connect } from 'react-redux';
import { userLogged } from '../actions'

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
    console.log('state')
    console.log(loadState())
    if (loadState().length === 0){
    }
    const { activityId } = this.props.params;
    api(`Activities/${activityId}`
    ).then((response) => {
      this.setState({ activity: response.data });
    }).catch((data) => {
      console.log('errors')
      console.log(data);
      if (data.response.status === 401){
        this.props.history.push('/login')
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
