import React, {Component} from 'react'
import { Grid, Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { userLogged } from '../actions'
import api from '../api.js'
//import { SearchBarRaw } from '../components/ActivityGrid/SearchBar.js'
import { ActivityItem } from '../components/ActivityGrid/ActivityItem.js'
import { LandingPageHeader } from '../components/ActivityGrid/LandingPageHeader.js'
import lodash from 'lodash'
import Datetime from 'react-datetime'
import Select from 'react-select'
import Masonry from 'react-masonry-component'
import './DateTimePicker.css'
import './LandingPage.css'

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
    var logged = false
    api(`hasActivities`
    ).then((response) => {
      logged = true
    }).catch((data) => {
    })
    this.props.userLogged(logged);
    this.state = {
    subcategory: '',
    subcategory_id: '',
    searchString: '',
    dateFrom: '',
    dateTo: '',
    Activities: [],
    logged: logged,
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
      var dateFrom = this.parseDatetoDateTime(e._d);
      this.setState({dateFrom});
      this.fetchActivitiesDebounced();
   };

    handleDateToChange(e) {
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
  };

  rangeOperator = (from, to) => {
      if (from && to) {
        return { between: [from, to] };
      }

      if (from) {
        return { gte: from };
      }

      if (to) {
        return { lte: to };
      }

      return null;
    };

    paramsForSerchString = () => {
      let searchString = this.state.searchString;
      let fromDate = this.state.dateFrom;
      let toDate = this.state.dateTo;
      const items = [];
      const dateAndTimeOp = this.rangeOperator(fromDate, toDate);
      if (dateAndTimeOp) {
        items.push({
          date_and_time: dateAndTimeOp,
        });
      }

      if (searchString) {
        items.push({
          or: [
            { name: { like: `%${searchString}%` } },
            { city: { like: `%${searchString}%` } },
          ],
        });
      }

      if (!items.length) {
        return {};
      }

      return {
        and: items,
      }
    };

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
      if (val == null) {
        this.setState({kategory: ''});
        this.setState({subDisabled: true});
        this.setState({subkategory: ''});
      } else {
        this.setState({kategory: val.value});
        this.setState({subDisabled: false});
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
      if (val == null) {
        this.setState({subkategory: ''});

      } else {
        this.setState({
          subcategory: val.value});
      }
    }

  render() {
    const { Activities } = this.state;
    const { logged } = this.state;

    const mappedActivities = Activities.map(function(activity){
                          return (
                            <Col xs={12} sm={6} md={4} lg={3} key={ activity.id }>
                              <ActivityItem activity={ activity } key={ activity.id } logged={logged}/>
                            </Col>
                        )
                      });

    var categoryOptions = [
        { value: '1', label: 'Sport' },
        { value: '2', label: 'Hry' },
        { value: '3', label: 'Cestování' },
        { value: '4', label: 'Jiné' }
    ];

    return (
        <div className="container-fluid">

          <LandingPageHeader handleSearchChange={this.handleSearchChange}/>

          <div className="container">
            <div className="row main test">
              <Grid>
                <Row>
                  <Col xs={6} md={4}>
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
                    <h3 className="section-heading">Od</h3>
                    <Datetime className="datetime" name="date" id="date" onChange={this.handleDateFromChange} />
                  </Col>
                  <Col xs={6} md={2}>
                    <h3 className="section-heading">Do</h3>
                    <Datetime className="datetime" name="date" id="date" onChange={this.handleDateToChange} />
                  </Col>
                </Row>
                <br />
                <br />

                <Masonry
                  className={'my-gallery-class'} // default ''
                  elementType={'div'} // default 'div'
                  options={masonryOptions} // default {}
                  disableImagesLoaded={false} // default false
                  updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                >
                  { mappedActivities }

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
