import React, { Component } from 'react';

export class PageFooter extends Component {
  render() {
    return (
      <div className="footer">
        <p>© Team 2 HobbyHub {new Date().getFullYear()}</p>
      </div>
    );
  }
}
