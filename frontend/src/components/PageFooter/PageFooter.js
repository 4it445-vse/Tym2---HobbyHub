import React, { Component } from 'react'

import FontAwesome from 'react-fontawesome'

import './PageFooter.css';

export class PageFooter extends Component {
  render() {
    return (
      <div className="footer">
        <div className="container">
          <ul className="pull-left">
            <li><dl>© Team 2 HobbyHub {new Date().getFullYear()}</dl></li>
          </ul>
          <ul className="social-icon animate pull-right">
            <li><a href="#" title="facebook" target="_blank"><i className="fa fa-facebook"></i></a></li>
            <li><a href="#" title="twitter" target="_blank"><i className="fa fa-twitter"></i></a></li>
            <li><a href="#" title="google plus" target="_blank"><FontAwesome name='facebook'/></a></li>
          </ul>
        </div>
      </div>
    );
  }
}
