import React  from 'react';

import './PageFooter.css';

const fb_icon = require('../../img/facebook_icon.png')
const yt_icon = require('../../img/youtube_icon.png')
const ig_icon = require('../../img/instagram_icon.png')

const Icon = (props) => (
  <li>
    <a className="navbar-brand vcenter changeFont" href="#">
      <span><img className="img-responsive2 vcenter" src={props.src} alt="icon"/></span>
    </a>
  </li>
)

export const PageFooter = () => (
      <div className="navbar navbar-default navbar-fixed-bottom footer">
        <div className="container-fluid cut-width">
          <ul className="nav navbar-nav navbar-left">
            <li>
              <p> © HobbyHub {new Date().getFullYear()}, made with love by Team 2</p>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right hidden-xs">
            <Icon src={fb_icon} alt="facebook"/>
            <Icon src={yt_icon} alt="youtube"/>
            <Icon src={ig_icon} alt="instagram"/>
          </ul>
        </div>
      </div>
);
