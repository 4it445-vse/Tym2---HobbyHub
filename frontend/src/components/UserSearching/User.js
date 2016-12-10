import React, { Component } from 'react';
import { Image, Button, Col, Row } from 'react-bootstrap';

export class User extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isInvited: true
    }
    this._onInvite = this._onInvite.bind(this)
  }

  _onInvite(e) {

  }

  _avatar(){
    return (
      <Col xs={3} md={1} lg={1}>
        <Image
          src="http://www.entando.com/portal/resources/cms/images/feature-user-management_d1.png"
          alt="90x90">
        </Image>
      </Col>
    )
  }

  _name(){
    return (
      <Col xs={3} md={3} lg={2}>
        <h4>{this.props.name}</h4>
      </Col>
    )
  }

  _buttons(){
    return (
      <Col xs={6} md={8} lg={9}>
        <Button
          bsStyle="default"
          disabled={this.state.isInvited ? true : false}
          onClick={this._onInvite()}
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
        <Row>
          {this._avatar()}
          {this._name()}
          {this._buttons()}
        </Row>
        <br/>
      </div>
    )
  }
}
