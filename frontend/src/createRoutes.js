import React from 'react';
import { IndexRoute, Route } from 'react-router';

import { AppPage } from './pages/AppPage.js';
import { NoMatchPage } from './pages/NoMatchPage.js';
import  RegistrationPage  from './pages/RegistrationPage'
import  LoginPage  from './pages/LoginPage'
import  CreateActivityPage  from './pages/CreateActivityPage'

export function createRoutes() {
  return (
    <Route path="/" component={AppPage}>
      <IndexRoute component={CreateActivityPage}/>
      <Route path="/createActivity" component={CreateActivityPage}/>
      <Route path="/login" component={LoginPage}/>
      <Route path="/register" component={RegistrationPage}/>
      <Route path="*" component={NoMatchPage}/>
    </Route>
  );
}
