import React, {Component} from 'react';
import $ from 'jquery';
//import { ActivityGrid } from '../components/ActivityGrid/ActivityGrid.js';
import { Jumbotron, Thumbnail, Grid, Button, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { userLogged } from '../actions'
import SearchMenu from '../components/ActivityGrid/SearchBar'

import './LandingPage.css'

class LandingPageRaw extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.props.userLogged(false)
  }

  onSubmit(event) {
    event.preventDefault();
    console.log('submitted')
  }

  render() {
    var windowHeight = $(window).height();
    if (windowHeight > 690) { windowHeight = 690 }

    return (
<div className="container">
  <Jumbotron>
    <h1>HobbyHub</h1>
    <p>Snadná cesta, jak najít parťáky pro své zájmy. Snadnější vyhledávání než na facebooku. Snadnější komunikace.</p>
  </Jumbotron>

  <div className="row main">
    <Grid>
      <Row>
        <SearchMenu />
      </Row>
    </Grid>
    <br/>
    <br/>

    <Grid>
      <Thumbnail src="https://www.ticketstream.cz/tsp/static/czech/cs/partnership/images/16.png" alt="242x200">
        <h3>Hokej</h3>
              <p>Description</p>
              <p>
                <Button bsStyle="primary">Attend</Button>&nbsp;
                <Button bsStyle="default">View</Button>
              </p>
            </Thumbnail>
          </Grid>


          <Grid>
            <Row>
              <Col xs={6} md={3}>
                <Thumbnail src="https://www.ticketstream.cz/tsp/static/czech/cs/partnership/images/16.png" alt="242x200">
                  <h3>Hokej</h3>
                  <p>Description</p>
                  <p>
                    <Button bsStyle="primary">Attend</Button>&nbsp;
                    <Button bsStyle="default">View</Button>
                  </p>
                </Thumbnail>
              </Col>
              <Col xs={6} md={3}>
                <Thumbnail src="https://www.ticketstream.cz/tsp/static/czech/cs/partnership/images/16.png" alt="242x200">
                  <h3>Fotbal</h3>
                  <p>Description</p>
                  <p>
                    <Button bsStyle="primary">Attend</Button>&nbsp;
                    <Button bsStyle="default">View</Button>
                  </p>
                </Thumbnail>
              </Col>
              <Col xs={6} md={3}>
                <Thumbnail src="https://www.ticketstream.cz/tsp/static/czech/cs/partnership/images/16.png" alt="242x200">
                  <h3>Lyžování</h3>
                  <p>Description</p>
                  <p>
                    <Button bsStyle="primary">Attend</Button>&nbsp;
                    <Button bsStyle="default">View</Button>
                  </p>
                </Thumbnail>
              </Col>
              <Col xs={6} md={3}>
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
              <Col xs={6} md={3}>
                <Thumbnail src="https://www.ticketstream.cz/tsp/static/czech/cs/partnership/images/16.png" alt="242x200">
                  <h3>Hokej</h3>
                  <p>Description</p>
                  <p>
                    <Button bsStyle="primary">Attend</Button>&nbsp;
                    <Button bsStyle="default">View</Button>
                  </p>
                </Thumbnail>
              </Col>
              <Col xs={6} md={3}>
                <Thumbnail src="https://www.ticketstream.cz/tsp/static/czech/cs/partnership/images/16.png" alt="242x200">
                  <h3>Fotbal</h3>
                  <p>Description</p>
                  <p>
                    <Button bsStyle="primary">Attend</Button>&nbsp;
                    <Button bsStyle="default">View</Button>
                  </p>
                </Thumbnail>
              </Col>
              <Col xs={6} md={3}>
                <Thumbnail src="https://www.ticketstream.cz/tsp/static/czech/cs/partnership/images/16.png" alt="242x200">
                  <h3>Lyžování</h3>
                  <p>Description</p>
                  <p>
                    <Button bsStyle="primary">Attend</Button>&nbsp;
                    <Button bsStyle="default">View</Button>
                  </p>
                </Thumbnail>
              </Col>
              <Col xs={6} md={3}>
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

        </div>
      </div>

        );
    }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer
  }
}

export default connect(mapStateToProps, { userLogged })(LandingPageRaw)
