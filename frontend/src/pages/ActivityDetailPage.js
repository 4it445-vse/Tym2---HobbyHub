import React, {Component} from 'react';
import lodash from 'lodash';
import $ from 'jquery';
import api from '../api.js';
// import { ActivityGrid } from '../components/ActivityGrid/ActivityGrid.js';
import { Thumbnail, Grid, Button, Col, Row } from 'react-bootstrap';

import { connect } from 'react-redux';
import { userLogged } from '../actions'

const IMAGE_3 = 'http://www.pixelstalk.net/wp-content/uploads/2016/09/Adventure-HD-Wallpaper.jpg'

import classNames from 'classnames';

export class ActivityDetailPageRaw extends Component {
  constructor(props) {
    super(props);
    console.log('detail started')
    console.log('params '+this.props.params)
    this.state = {
      activity: null,
    };
    this.props.userLogged(true)
  }

  componentDidMount() {
    const { activityId } = this.props.params;

console.log('id ' + activityId)
    api(`Activities/${activityId}`
    ).then((response) => {
      console.log(response.data)
      this.setState({ activity: response.data });
    });
  }


  render() {
    console.log('state ' + this.state)
    const { activity } = this.state;
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
                   <Col xs={6} md={4}>
                     <Thumbnail src="http://www.canterburyicehockey.com.au/wp-content/themes/canterbury-ice-hockey/library/images/default-post-image.jpg" alt="242x200" border='none'>

                     </Thumbnail>
                   </Col>
                   <Col>
                    <p>Místo: {city}</p>
                    <p>Ulice: {address}</p>
                    <p>Datum: {date_and_time}</p>
                    <p>Čas:   {date_and_time}</p>
                   </Col>
                   </Row>
                   <Row>
                   <Col>
                   <h2>Popis</h2>
                   <p>{about}</p>
                   </Col>
                   </Row>
                   <Row>
                     <h2>Účastníci TODO / {user_count}</h2>
                   </Row>
                   <Row>
                   <Col xs={5} md={3}>
                   <Thumbnail src=" http://cliparts.co/cliparts/dc4/5BA/dc45BA8xi.jpg" alt="60x50">
                     <h3>Pavel Skočdopole</h3>

                   </Thumbnail>
                   </Col>
                   <Col xs={5} md={3}>
                   <Thumbnail src=" http://cliparts.co/cliparts/dc4/5BA/dc45BA8xi.jpg" alt="60x50">
                     <h3>Jana Světlá</h3>

                   </Thumbnail>
                   </Col>
                   <Col xs={5} md={3}>
                   <Thumbnail src=" http://cliparts.co/cliparts/dc4/5BA/dc45BA8xi.jpg" alt="60x50">
                     <h3>Fanda Kovář</h3>

                   </Thumbnail>
                   </Col>
                   <Col xs={5} md={3}>
                   <Thumbnail src=" http://cliparts.co/cliparts/dc4/5BA/dc45BA8xi.jpg" alt="60x50">
                     <h3>Jeník Novák</h3>
                   </Thumbnail>
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
