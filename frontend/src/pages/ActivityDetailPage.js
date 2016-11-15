import React, {Component} from 'react';
import lodash from 'lodash';
import $ from 'jquery';
import api from '../api.js';
// import { ActivityGrid } from '../components/ActivityGrid/ActivityGrid.js';
import { Thumbnail, Grid, Button, Col, Row } from 'react-bootstrap';

import { connect } from 'react-redux';
import { userLogged } from '../actions'

const IMAGE_3 = 'http://www.pixelstalk.net/wp-content/uploads/2016/09/Adventure-HD-Wallpaper.jpg'

class LandingPageRaw extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.props.userLogged(true)
    }

    render() {

        return (
            <Grid>
                <h1>Hokej</h1>

                   <Row>
                   <Col xs={6} md={4}>
                     <Thumbnail src="http://www.canterburyicehockey.com.au/wp-content/themes/canterbury-ice-hockey/library/images/default-post-image.jpg" alt="242x200" border='none'>

                     </Thumbnail>
                   </Col>
                   <Col>
                    <p>Místo: Praha</p>
                    <p>Ulice: Testovací</p>
                    <p>Datum: Pondělí 13.06.2017</p>
                    <p>Čas:   12:30 - 16:00</p>
                   </Col>
                   </Row>
                   <Row>
                   <Col>
                   <h2>Popis</h2>
                   <p>Nějaký ten popis, co k tomu tvůrce dal</p>
                   </Col>
                   </Row>
                   <Row>
                     <h2>Účastníci</h2>
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

export default connect(mapStateToProps, { userLogged })(LandingPageRaw)
