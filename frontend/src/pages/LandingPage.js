import React, {Component} from 'react';
import { Jumbotron, Grid, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { userLogged, isUserLogged } from '../actions'
import api from '../api.js';
import SearchBar from 'search-bar-component';
import { ActivityItem } from '../components/ActivityGrid/ActivityItem.js'
import lodash from 'lodash'
import { ChoiceFilter } from '../components/ActivityGrid/ChoiceFilter.js'
import { createFilter } from 'react-search-input'
import Datetime from 'react-datetime';
import './DateTimePicker.css';

import './LandingPage.css'

const KEYS_TO_FILTERS = ['name', 'about']

export class LandingPageRaw extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.props.userLogged(isUserLogged());
    this.state = {
    searchTerm: '',
    ActivityCategories: [
          { label: 'Sport', value: '1'},
          { label: 'Board games', value: '2' },
          { label: 'Trips', value: '3' },
          { label: 'Events', value: '4' }
        ],
    ActivitySubcategories: [
          { label: 'Hockey', value: 'Hockey', id: '1' },
          { label: 'Football', value: 'Football', id: '1' },
          { label: 'Tennis', value: 'Tennis', id: '1' },
          { label: 'Sky diving', value: 'Sky diving', id: '1' },
          { label: 'Chess', value: 'Chess', id: '2' },
          { label: 'Monopoly', value: 'Monopoly', id: '2' },
          { label: 'Poker', value: 'Poker', id: '2' },
          { label: '"IT RAINS"', value: '"IT RAINS"', id: '2' },
          { label: 'Hiking', value: 'Hiking', id: '3' },
          { label: 'Hitch-hiking', value: 'Hitch-hiking', id: '3' },
          { label: 'Walks by the lake', value: 'Walks by the lake', id: '3' },
          { label: 'Birthday Party', value: 'Birthday Party', id: '4' },
          { label: 'Drinking games', value: 'Drinking games', id: '4' },
          { label: 'Tour de Pub', value: 'Tour de Pub', id: '4' }
        ],
  Activities: [],
  };
  this.searchUpdatedDebounced = lodash.debounce(
  this.searchUpdated,
  500
);
this.handleDateChange = this.handleDateChange.bind(this);
}

  onSubmit(event) {
    event.preventDefault();
  }

  componentDidMount() {
    api('Activities')
      .then((response) => {
        this.setState({ Activities: response.data });
      });
    }

    handleDateChange(e) {
      console.log(e)
     this.setState({date_and_time: e._d});
    }

    searchUpdated(searchTerm) {
      this.setState({searchTerm});
    };

  render() {
    const { Activities, ActivityCategories, ActivitySubcategories } = this.state;
    const filteredActivities = Activities.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

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
            <SearchBar placeholder="Search for activity..."
              onChange={(searchTerm, resolve) => {
                this.searchUpdatedDebounced(searchTerm);
              }}
              onSearch={(searchTerm) => {
                this.searchUpdatedDebounced(searchTerm);
              }} />

          </Row>
          <br />
          <Row>
            <Col xs={6} md={4}>
              <ChoiceFilter placeholder="All categories" label="Category" data={ this.state.ActivityCategories } />
            </Col>
            <Col xs={6} md={4}>
              <ChoiceFilter placeholder="All subcategories" label="Subcategory" data={ this.state.ActivitySubcategories } />
            </Col>
            <Col xs={6} md={2}>
              <h3 class="section-heading">From</h3>
              <Datetime className="datetime" name="date" id="date" onChange={this.handleDateChange} />
            </Col>
            <Col xs={6} md={2}>
              <h3 class="section-heading">To</h3>
              <Datetime className="datetime" name="date" id="date" onChange={this.handleDateChange} />
            </Col>
          </Row>
          <br />
          <br />
          {filteredActivities.map(activity => {
            return (
              <Col xs={6} md={3}>
                <ActivityItem activity={ activity } key={ activity.id }/>
              </Col>
            )
          })}

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
