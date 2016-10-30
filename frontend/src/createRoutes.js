import React from 'react';
import { IndexRoute, Route } from 'react-router';

import { AppPage } from './pages/AppPage.js';
import { ContactPage } from './pages/ContactPage.js';
import { HomePage } from './pages/HomePage.js';
import { NoMatchPage } from './pages/NoMatchPage.js';
import { ProductDetailPage } from './pages/ProductDetailPage.js'
import { ProductsPage } from './pages/ProductsPage.js';
import { ShoppingCartPage } from './pages/ShoppingCartPage.js'
import { ShoppingCartCheckoutPage } from './pages/ShoppingCartCheckoutPage.js'
import { RegistrationPage } from './pages/RegistrationPage'
import { LoginPage } from './pages/LoginPage'
import { CreateActivityPage } from './pages/CreateActivityPage'

export function createRoutes() {
  return (
    <Route path="/" component={AppPage}>
      <IndexRoute component={HomePage}/>
      <Route path="/products">
        <IndexRoute component={ProductsPage}/>
        <Route path=":productId" component={ProductDetailPage}/>
      </Route>
      <Route path="/createActivity" component={CreateActivityPage}/>
      <Route path="/login" component={LoginPage}/>
      <Route path="/register" component={RegistrationPage}/>
      <Route path="/contact" component={ContactPage}/>
      <Route path="/cart" component={ShoppingCartPage}/>
      <Route path="/cart/checkout" component={ShoppingCartCheckoutPage}/>
      <Route path="*" component={NoMatchPage}/>
    </Route>
  );
}
