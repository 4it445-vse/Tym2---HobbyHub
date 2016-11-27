import React, {Component} from 'react';
import { ActivityGrid } from '../components/ActivityGrid/ActivityGrid.js';
import { Jumbotron, Thumbnail, Grid, Button, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { userLogged, isUserLogged } from '../actions'
import api from '../api.js';
import SearchMenu from '../components/ActivityGrid/SearchBar';
import { Link } from 'react-router'

import './LandingPage.css'

export class LandingPageRaw extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.props.userLogged(isUserLogged());
    this.state = {
  Activities: null,
};
  }

  onSubmit(event) {
    event.preventDefault();
    console.log('submitted')
  }

  componentDidMount() {
    api('Activities')
      .then((response) => {
        this.setState({ Activities: response.data });
      });
}

  render() {
    const { Activities } = this.state;

    return (
    <div className="container">
      <Jumbotron>
        <h1>HobbyHub</h1>
        <p>Snadná cesta, jak najít parťáky pro své zájmy.</p>
        <p>Snadnější vyhledávání než na facebooku. Snadnější komunikace.</p>
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

        {Activities === null ?
          <div>Loading...</div> :
          <ActivityGrid Activities={Activities}/>
        }

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
