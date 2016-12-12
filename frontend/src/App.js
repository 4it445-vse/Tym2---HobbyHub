import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { Router, applyRouterMiddleware, browserHistory } from 'react-router';
import { useScroll } from 'react-router-scroll';

import './assets/bootstrap/css/bootstrap.min.css'
import './assets/css/font-awesome.min.css'
import './assets/css/animate.css'
import './assets/css/owl.carousel.css'
import './assets/css/owl.theme.css'
import './assets/css/owl.transitions.css'
import './assets/css/material.css'
import './assets/css/style.css'
import './assets/css/responsive.css'
import './assets/css/color/blue.css' 

import { createRoutes } from './createRoutes.js';

export class App extends Component {
  render() {
    const { store } = this.props;
    const routes = createRoutes();
    return (
      <Provider store={store}>
        <Router history={browserHistory} render={applyRouterMiddleware(useScroll())} token={null}>
          {routes}
        </Router>
      </Provider>
    );
  }
}
