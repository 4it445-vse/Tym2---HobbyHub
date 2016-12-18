import React, {Component} from 'react'
import { Jumbotron, Grid, Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { userLogged, isUserLogged } from '../actions'
import api from '../api.js'
import SearchBar from 'search-bar-component'
import { SearchBarRaw } from '../components/ActivityGrid/SearchBar.js'
import { ActivityItem } from '../components/ActivityGrid/ActivityItem.js'
import lodash from 'lodash'
import { createFilter } from 'react-search-input'
import Datetime from 'react-datetime'
import Select from 'react-select'
import Masonry from 'react-masonry-component'
import AbsoluteGrid from 'react-absolute-grid'
import './DateTimePicker.css'
import './LandingPage.css'

const KEYS_TO_FILTERS = ['name', 'about', 'city'];
const CATEGORY_FILTER = ['subcategory_id'];

var masonryOptions = {
    transitionDuration: 0
};

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
    LandingPageRaw.onSubmit = LandingPageRaw.onSubmit.bind(this);
    this.props.userLogged(isUserLogged());
    this.state = {
    subcategory: '',
    subcategory_id: '',
    searchString: '',
    dateFrom: '',
    dateTo: '',
  Activities: [],
  };
this.fetchActivitiesDebounced = lodash.debounce(
  this.fetchActivities,
  500
);
this.paramsForSerchStringDebounced = lodash.debounce(
  this.paramsForSerchString,
  500
);
this.handleSearchChange = this.handleSearchChange.bind(this);
this.handleDateFromChange = this.handleDateFromChange.bind(this);
this.handleDateToChange = this.handleDateToChange.bind(this);
this.handleKategoryChange = this.handleKategoryChange.bind(this);
this.handleSubkategoryChange = this.handleSubkategoryChange.bind(this);
}

    static onSubmit(event) {
      event.preventDefault();
    }

    parseDatetoDateTime(date) {
      if (date != null) {
        return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
      }
      else return '';

    }

    handleDateFromChange(e) {
      console.log('jsem v DATE FROM:', this.parseDatetoDateTime(e._d))
      var dateFrom = this.parseDatetoDateTime(e._d);
      this.setState({dateFrom});
      this.fetchActivitiesDebounced();
   };

    handleDateToChange(e) {
      console.log('jsem v DATE TO:', this.parseDatetoDateTime(e._d));
      var dateTo = this.parseDatetoDateTime(e._d);
      this.setState({dateTo});
      this.fetchActivitiesDebounced();
   };

    searchUpdated(searchString) {
      this.setState({searchString});
    };

    handleSearchChange(event) {
    const searchString  = event.target.value;
    this.setState({searchString});
    this.fetchActivitiesDebounced();
  }

//    handleDateChange(dateFrom, dateTo) {
// this.fetchActivitiesDebounced();
//    }

    paramsForSerchString() {
      var dateFrom = this.state.dateFrom;
      var dateTo = this.state.dateTo;
      var searchString = this.state.searchString;
      var where = {};
      if (dateFrom || dateTo) {
        var date_and_time = {};
        let anyDate = false;

        if (dateFrom) {
          anyDate = true;
          where = { ...where, date_and_time: { gte: dateFrom }};
        }
        if (dateTo) {
          anyDate = true;
          where = { ...where, date_and_time: { lte: dateTo }};
        }
      }
      if (searchString) {
        where = {
          ...where, or:[{name: { like: `%${searchString}%` }}, {city: { like: `%${searchString}%` }}]
        };
      }
      return where;
    }

    fetchActivities() {
      api('Activities', { params: {filter: {where: {and: [ this.paramsForSerchString() ] }}}}  )
        .then((response) => {
          this.setState({ Activities: response.data });
        });
    }

    componentDidMount() {
        this.fetchActivities();
      }

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
              subcategoryOptions: sport,
              searchString: val.value
            });
            firstElement = sport[0].value
            break;
            case '2':
              this.setState({
                subcategoryOptions: hry,
                searchString: val.value
              });
              firstElement = hry[0].value
            break;
            case '3':
              this.setState({
                subcategoryOptions: cestovani,
                searchString: val.value
            });
            firstElement = cestovani[0].value
            break;
            case '4':
              this.setState({
                subcategoryOptions: jine,
                subcategory: "20"
              });
              firstElement = jine[0].value
            break;
            case null:
              this.setState({
                subcategoryOptions: [],
                searchString: 's'
              });
            break;
            default:
            this.setState({
              subcategoryOptions: []
            });
          };

      this.setState({subkategory: firstElement});
      }
    }

    handleSubkategoryChange(val) {
      console.log(val)
      if (val == null) {
        this.setState({subkategory: ''});

      } else {
        this.setState({
          subcategory: val.value});
      }
    }

  render() {
    const { Activities } = this.state;

    var categoryOptions = [
        { value: '1', label: 'Sport' },
        { value: '2', label: 'Hry' },
        { value: '3', label: 'Cestování' },
        { value: '4', label: 'Jiné' }
    ];

    return (
          <div className="container-fluid">
            <section className="index header" id="home">
              <div className="container">
                <div className="intro-text">
                  <h1>Vítá Vás <span>HobbyHub!</span></h1>
                  <p>Místo kde najít parťáky na akce.</p>
                  <Row>
                    {/* <input type="text" className="search-bar-input" maxlength="100" onChange={this.handleSearchChange}/> */}
                    <SearchBarRaw
                      placeholder="Najdi svou vysněnou událost..."
                      handleSearchChange={this.handleSearchChange}
                    />
                  </Row>

                </div>
              </div>
            </section>

            <div className="container">
              <div className="row main">
                <Grid>
                  <Row>
                    <Col xs={6} md={4}>
                      {/*}<ChoiceFilter placeholder="All categories" label="Category" data={ this.state.ActivityCategories } /> */}
                      <h3 className="section-heading">Kategorie</h3>
                      <Select
                        name="form-field-name"
                        value={this.state ? this.state.kategory : ''}
                        options={categoryOptions}
                        title="Zvolte kategorii"
                        onChange={this.handleKategoryChange}
                        clearable={true}
                        placeholder="Zvolte kategorii"
                      />
                    </Col>
                    <Col xs={6} md={4}>
                      {/*<ChoiceFilter placeholder="All subcategories" label="Subcategory" data={ this.state.ActivitySubcategories } />*/}
                      <h3 className="section-heading">Podkategorie</h3>
                      <Select
                        value={this.state ? this.state.subkategory : ''}
                        options={this.state ? this.state.subcategoryOptions : []}
                        title="Zvolte kategorii"
                        onChange={this.handleSubkategoryChange}
                        clearable={true}
                        placeholder="Zvolte kategorii"
                        disabled={this.state ? (this.state.subDisabled == null ? true : this.state.subDisabled) : true}
                        autocomplete={true}
                      />
                    </Col>
                    <Col xs={6} md={2}>
                      <h3 className="section-heading">From</h3>
                      <Datetime className="datetime" name="date" id="date" onChange={this.handleDateFromChange} />
                    </Col>
                    <Col xs={6} md={2}>
                      <h3 className="section-heading">To</h3>
                      <Datetime className="datetime" name="date" id="date" onChange={this.handleDateToChange} />
                    </Col>
                  </Row>
                  <br />
                  <br />

                  <Masonry
                    className={'my-gallery-class'} // default ''
                    elementType={'ul'} // default 'div'
                    options={masonryOptions} // default {}
                    disableImagesLoaded={false} // default false
                    updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                  >
                    {
                      Activities.map(function(activity){
                        return (
                          <Col xs={12} sm={6} md={4} lg={3}>
                            <ActivityItem activity={ activity } key={ activity.id }/>
                          </Col>
                      )})
                    }
                  </Masonry>
                </Grid>
              </div>
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
