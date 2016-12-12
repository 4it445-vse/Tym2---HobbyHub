import React, { Component } from 'react';
import { Image, Button, Col, Row } from 'react-bootstrap';

import api from '../../api.js';


export class User extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isInvited: false
    }
    this._onInvite = this._onInvite.bind(this)
  }

  _onInvite(e) {
    // TODO
    console.log(this.props)
    console.log(this.props.activityId)
    console.log(this.props.email)
    api.post(`Activities/${this.props.activityId}/${this.props.email}/invite`
    ).then((data) => {
      this.setState({
        isInvited: data.invited
      })
    })
  }

  _avatar(){
    return (
      <Col key={`${this.props.id}1`} xs={3} md={1} lg={1}>
        <Image
          src="http://www.entando.com/portal/resources/cms/images/feature-user-management_d1.png"
          alt="90x90">
        </Image>
      </Col>
    )
  }

  _name(){
    return (
      <Col key={`${this.props.id}2`} xs={3} md={3} lg={2}>
        <h4>{this.props.name}</h4>
      </Col>
    )
  }

  _buttons(){
    return (
      <Col key={`${this.props.id}3`} xs={6} md={8} lg={9}>
        <Button
          bsStyle={this.state.isInvited ? "success" : "default"}
          disabled={this.state.isInvited}
          onClick={this._onInvite}
        >
          <span className={this.state.isInvited ? "glyphicon glyphicon-ok" : "glyphicon glyphicon-plus"}>
          </span> {this.state.isInvited ? "Uživatel pozván" : "Pozvat na akci" }
        </Button>&nbsp;
        <Button bsStyle="default">
          <span className="glyphicon glyphicon-send"></span> Poslat zprávu
        </Button>&nbsp;
        <Button bsStyle="default">
          <span className="glyphicon glyphicon-heart"></span> Přidat do přátel
        </Button>
      </Col>
    )
  }

  render() {
    return (
      <div>
        <Row key={this.props.id}>
          {this._avatar()}
          {this._name()}
          {this._buttons()}
        </Row>
        <br/>
      </div>
    )
  }
}
