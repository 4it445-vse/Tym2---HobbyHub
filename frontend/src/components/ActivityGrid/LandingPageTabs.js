import React, {Component} from 'react';
// import './LandingPageTabs.css'
// import {LandingPageTabsContent} from './LandingPageTabsContent.js'
import {Tabs, Tab, Col, Row} from 'react-bootstrap'
import {ActivityItem} from './ActivityItem.js'
import Masonry from 'react-masonry-component'
import api from '../../api.js'

const masonryOptions = {
    transitionDuration: 0
};

export class LandingPageTabs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mappedActivities: undefined,
            userAttends: undefined,
            userOrganizes: undefined,
            logged: false
        }
    }

    componentWillMount(props){
      api(`hasActivities`
      ).then((response) => {
        this.props.userLogged(true);
        this.setState({logged: true})
      }).catch((data) => {
        this.props.userLogged(false);
        this.setState({logged: false})
      })
    }

    renderMasonry(acts) {
        return (
            <Masonry options={masonryOptions} disableImagesLoaded={false} updateOnEachImageLoad={false}>
                {acts}
            </Masonry>
        )
    }

    render() {
      let { Activities, activitiesUserAttends, activitiesUserOrganizes } = this.props;
      let logged = this.state;
      let mappedActivities = Activities.map(function(activity) {
          return (
              <Col xs={12} sm={6} md={4} lg={3}>
                  <ActivityItem activity={activity} key={activity.id} logged={logged}/>
              </Col>
          )
      })

      if (logged) {

        let userOrganizes = activitiesUserOrganizes.map(function(activity) {
            return (
                <Col xs={12} sm={6} md={4} lg={3}>
                    <ActivityItem activity={activity} key={activity.id} logged={logged}/>
                </Col>
            )
        })

        let userAttends = activitiesUserAttends.map(function(activity) {
            return (
                <Col xs={12} sm={6} md={4} lg={3}>
                    <ActivityItem activity={activity} key={activity.id} logged={logged}/>
                </Col>
            )
        })

        return (
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
              <Tab eventKey={1} title="Všechny akce">
                  <Row>
                      {this.renderMasonry(mappedActivities)}
                  </Row>
              </Tab>
              <Tab eventKey={2} title="Moje akce">
                  {this.renderMasonry(userOrganizes)}
              </Tab>
              <Tab eventKey={3} title="Akce kterých se účastním">
                  {this.renderMasonry(userAttends)}
              </Tab>
          </Tabs>
        );
      }
      else {
        return (
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
              <Tab eventKey={1} title="Všechny akce">
                  {this.renderMasonry(mappedActivities)}
              </Tab>
          </Tabs>
        );
      }

    }
}
