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
import Select from 'react-select';
import './DateTimePicker.css';
import './Select.css';

import './LandingPage.css'

const KEYS_TO_FILTERS = ['name', 'about', 'city', 'subcategory_id']

const sport = [
  { value: '1', label: 'Fotbal' },
  { value: '2', label: 'Floorbal' },
  { value: '3', label: 'Basketball' },
  { value: '4', label: 'Volejbal' },
  { value: '5', label: 'Házená' },
  { value: '6', label: 'Nohejbal' },
  { value: '7', label: 'Tenis' },
  { value: '8', label: 'Squash' },
  { value: '9', label: 'Jiné' },
];

const hry = [
  { value: '10', label: 'Počítačové' },
  { value: '11', label: 'Stolní společenské' },
  { value: '12', label: 'Deskovky' },
  { value: '13', label: 'Jiné' },
];

const cestovani = [
  { value: '14', label: 'Rekreační turistika' },
  { value: '15', label: 'Horská turistika' },
  { value: '16', label: 'Zahraniční turistika' },
  { value: '17', label: 'Vandr'},
  { value: '18', label: 'Památky' },
  { value: '19', label: 'Jiné' },
];

const jine = [
  { value: '20', label: 'Jiné' },
]

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
this.handleKategoryChange = this.handleKategoryChange.bind(this);
this.handleSubkategoryChange = this.handleSubkategoryChange.bind(this);
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

    handleKategoryChange(val){
      console.log(val)
      if (val == null) {
        this.setState({kategory: ''});
        this.setState({subDisabled: true});
        this.setState({subkategory: ''});
      } else {
        this.setState({kategory: val.value});
        this.setState({subDisabled: false});
        console.log(val.value)

        var firstElement = ''

        switch(val.value) {
            case '1':
              this.setState({
              subkategoryOptions: sport,
              searchTerm: val.value
            });
            firstElement = sport[0].value
            break;
            case '2':
              this.setState({
                subkategoryOptions: hry,
                searchTerm: val.value
              });
              firstElement = hry[0].value
            break;
            case '3':
              this.setState({
                subkategoryOptions: cestovani,
                searchTerm: val.value
            });
            firstElement = cestovani[0].value
            break;
            case '4':
              this.setState({
                subkategoryOptions: jine,
                searchTerm: val.value
              });
              firstElement = jine[0].value
            break;
            case null:
              this.setState({
                subkategoryOptions: [],
                searchTerm: 's'
              });
            break;
            default:
            this.setState({
              subkategoryOptions: []
            });
          };

      this.setState({subkategory: firstElement});
      }
    }

    handleSubkategoryChange(val){
      console.log(val)
      if (val == null) {
        this.setState({subkategory: ''});

      } else {
        this.setState({subkategory: val.value,
        searchTerm: val.value});
      }
    }

  render() {
    const { Activities, ActivityCategories, ActivitySubcategories } = this.state;
    const filteredActivities = Activities.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

    var kategoryOptions = [
        { value: '1', label: 'Sport' },
        { value: '2', label: 'Hry' },
        { value: '3', label: 'Cestování' },
        { value: '4', label: 'Jiné' }
    ];

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
              {/*}<ChoiceFilter placeholder="All categories" label="Category" data={ this.state.ActivityCategories } /> */}
              <h3 className="section-heading">Kategorie</h3>
              <Select
                name="form-field-name"
                value={this.state ? this.state.kategory : ''}
                options={kategoryOptions}
                title="Zvolte kategorii"
                onChange={this.handleKategoryChange}
                clearable={true}
                placeholder="Zvolte kategorii"
              />
            </Col>
            <Col xs={6} md={4}>
              {/*<ChoiceFilter placeholder="All subcategories" label="Subcategory" data={ this.state.ActivitySubcategories } />*/}
              <h3 class="section-heading">Podkategorie</h3>
              <Select
                name="form-field-name"
                value={this.state ? this.state.subkategory : ''}
                options={this.state ? this.state.subkategoryOptions : []}
                title="Zvolte kategorii"
                onChange={this.handleSubkategoryChange}
                clearable={true}
                placeholder="Zvolte kategorii"
                disabled={this.state ? (this.state.subDisabled == null ? true : this.state.subDisabled) : true}
                autocomplete={true}
              />
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
