import React from 'react';
import { IndexRoute, Route } from 'react-router';

import { AppPage } from './pages/AppPage.js';
import { NoMatchPage } from './pages/NoMatchPage.js';

import  SettingsPage  from './pages/SettingsPage';
import  FriendsPage  from './pages/FriendsPage';
import  MyProfilePage  from './pages/MyProfilePage';
import  RegistrationPage  from './pages/RegistrationPage'
import  LoginPage  from './pages/LoginPage'
import  CreateActivityPage  from './pages/CreateActivityPage'
import  CreateProfileCommentPage  from './pages/CreateProfileCommentPage'
import  LandingPage  from './pages/LandingPage.js';
import  ActivityDetailPage  from './pages/ActivityDetailPage.js';
// import  UserDetailPage  from './pages/UserDetailPage.js';

export function createRoutes() {
  return (
    <Route path="/" component={AppPage}>
      <IndexRoute component={LandingPage}/>
      <Route path="/friends" component={FriendsPage}/>
      <Route path="/activityDetail">
        <IndexRoute component={ActivityDetailPage}/>
        <Route path=":activityId" component={ActivityDetailPage}/>
      </Route>
      <Route path="/land" component={LandingPage}/>
      <Route path="/settings" component={SettingsPage}/>
      <Route path="/profile" component={MyProfilePage}/>
      <Route path="/createProfileComment">
        <IndexRoute component={CreateProfileCommentPage}/>
        <Route path=":customerId" component={CreateProfileCommentPage}/>
      </Route>
      <Route path="/createActivity" component={CreateActivityPage}/>
      <Route path="/login" component={LoginPage}/>
      <Route path="/register" component={RegistrationPage}/>
      <Route path="*" component={NoMatchPage}/>
    </Route>
  );
}
