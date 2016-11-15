import React, {Component} from 'react';
import lodash from 'lodash';
import $ from 'jquery';
import api from '../api.js';
// import { ActivityGrid } from '../components/ActivityGrid/ActivityGrid.js';
import { Carousel, Thumbnail, Grid, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import { userLogged } from '../actions';
import { isUserLogged } from '../actions'

const IMAGE_3 = 'http://www.pixelstalk.net/wp-content/uploads/2016/09/Adventure-HD-Wallpaper.jpg'

class LandingPageRaw extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.props.userLogged(false)
    }

    render() {
        return (
            <Grid>
                <Carousel>
                  <Carousel.Item>
                    <img width={900} height={500} alt="900x500" src="http://www.gomammoth.co.uk/wp-content/uploads/2015/11/SportsFitnessLister_0015_GOMammoth-American-Flag-Football-London.jpg"/>
                    <Carousel.Caption>
                      <h3>First slide label</h3>
                      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img width={900} height={500} alt="900x500" src="http://www.gomammoth.co.uk/wp-content/uploads/2015/11/SportsFitnessLister_0013_GOMammoth-Dodgeball-London.jpg"/>
                    <Carousel.Caption>
                      <h3>Second slide label</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img width={900} height={500} alt="900x500" src="http://www.gomammoth.co.uk/wp-content/uploads/2015/11/SportsFitnessLister_0012_GOMammoth-Football-London.jpg"/>
                    <Carousel.Caption>
                      <h3>Third slide label</h3>
                      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
                <br/>
                <h1>Activities</h1>

                   <Row>
                   <Col xs={6} md={4}>
                     <Thumbnail src="https://www.ticketstream.cz/tsp/static/czech/cs/partnership/images/16.png" alt="242x200">
                       <h3>Hokej</h3>
                       <p>Description</p>
                       <p>
                         <Button bsStyle="primary">Attend</Button>&nbsp;
                         {/* <Button bsStyle="default">View</Button> */}
                         <Link className="btn btn-default" to="/activityDetail" role="button">View</Link>
                       </p>
                     </Thumbnail>
                   </Col>
                   <Col xs={6} md={4}>
                     <Thumbnail src="https://www.ticketstream.cz/tsp/static/czech/cs/partnership/images/16.png" alt="242x200">
                       <h3>Fotbal</h3>
                       <p>Description</p>
                       <p>
                         <Button bsStyle="primary">Attend</Button>&nbsp;
                         <Button bsStyle="default">View</Button>
                       </p>
                     </Thumbnail>
                   </Col>
                   <Col xs={6} md={4}>
                     <Thumbnail src="https://www.ticketstream.cz/tsp/static/czech/cs/partnership/images/16.png" alt="242x200">
                       <h3>Lyžování</h3>
                       <p>Description</p>
                       <p>
                         <Button bsStyle="primary">Attend</Button>&nbsp;
                         <Button bsStyle="default">View</Button>
                       </p>
                     </Thumbnail>
                   </Col>
                   </Row>
                   <Row>
                   <Col xs={6} md={4}>
                     <Thumbnail src="https://www.ticketstream.cz/tsp/static/czech/cs/partnership/images/16.png" alt="242x200">
                       <h3>Hokej</h3>
                       <p>Description</p>
                       <p>
                         <Button bsStyle="primary">Attend</Button>&nbsp;
                         <Button bsStyle="default">View</Button>
                       </p>
                     </Thumbnail>
                   </Col>
                   <Col xs={6} md={4}>
                     <Thumbnail src="https://www.ticketstream.cz/tsp/static/czech/cs/partnership/images/16.png" alt="242x200">
                       <h3>Fotbal</h3>
                       <p>Description</p>
                       <p>
                         <Button bsStyle="primary">Attend</Button>&nbsp;
                         <Button bsStyle="default">View</Button>
                       </p>
                     </Thumbnail>
                   </Col>
                   <Col xs={6} md={4}>
                     <Thumbnail src="https://www.ticketstream.cz/tsp/static/czech/cs/partnership/images/16.png" alt="242x200">
                       <h3>Lyžování</h3>
                       <p>Description</p>
                       <p>
                         <Button bsStyle="primary">Attend</Button>&nbsp;
                         <Button bsStyle="default">View</Button>
                       </p>
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
