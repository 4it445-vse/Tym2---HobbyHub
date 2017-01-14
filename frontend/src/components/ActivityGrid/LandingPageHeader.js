import React, { Component } from 'react'
import { SearchBarRaw } from './SearchBar.js'
import { Row } from 'react-bootstrap'

export class LandingPageHeader extends Component {

  render() {

    return (
      <section className="index header" id="home">
        <div className="container">
          <div className="intro-text">
            <h1>Vítá Vás <span>HobbyHub!</span></h1>
            <p>Místo kde najít parťáky na akce.</p>
            <Row>
              <SearchBarRaw
                placeholder="Najdi svou vysněnou událost..."
                handleSearchChange={this.props.handleSearchChange}
              />
            </Row>

          </div>
        </div>
      </section>
    );
  }
}
