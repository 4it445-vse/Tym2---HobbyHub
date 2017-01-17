import React, { Component } from 'react';
// import './LandingPageTabs.css'

export class LandingPageTabsContent extends Component {

  render() {

    return (
      <div className="tab-content">
        <div className="tab-pane fade in active" id="home">

          <h3 className="head text-center">User Experience</h3>
          <p className="narrow text-center">
            Lorem ipsum dolor sit amet, his ea mollis fabellas principes. Quo mazim facilis tincidunt ut, utinam saperet facilisi an vim.
          </p>

          <p className="text-center">
            {/* <a href="" className="btn btn-success btn-outline-rounded green"> Get Quote <span style="margin-left:10px;" className="glyphicon glyphicon-send"></span></a> */}
          </p>
        </div>
        <div className="tab-pane fade" id="profile">
          <h3 className="head text-center">Sketch</h3>
          <p className="narrow text-center">
            Lorem ipsum dolor sit amet, his ea mollis fabellas principes. Quo mazim facilis tincidunt ut, utinam saperet facilisi an vim.
          </p>

          <p className="text-center">
            {/* <a href="" className="btn btn-success btn-outline-rounded green"> Get Quote <span style="margin-left:10px;" className="glyphicon glyphicon-send"></span></a> */}
          </p>

        </div>
        <div className="tab-pane fade" id="prototyping">
          <h3 className="head text-center">Prototyping</h3>
          <p className="narrow text-center">
            Lorem ipsum dolor sit amet, his ea mollis fabellas principes. Quo mazim facilis tincidunt ut, utinam saperet facilisi an vim.
          </p>

          <p className="text-center">
            {/* <a href="" className="btn btn-success btn-outline-rounded green"> Get Quote <span style="margin-left:10px;" className="glyphicon glyphicon-send"></span></a> */}
          </p>
        </div>
        <div className="tab-pane fade" id="uidesign">
          <h3 className="head text-center">UI Design</h3>
          <p className="narrow text-center">
            Lorem ipsum dolor sit amet, his ea mollis fabellas principes. Quo mazim facilis tincidunt ut, utinam saperet facilisi an vim.
          </p>

          <p className="text-center">
            {/* <a href="" className="btn btn-success btn-outline-rounded green"> Get Quote <span style="margin-left:10px;" className="glyphicon glyphicon-send"></span></a> */}
          </p>
        </div>
        <div className="tab-pane fade" id="doner">
          <div className="text-center">
            <i className="img-intro icon-checkmark-circle"></i>
          </div>
          <h3 className="head text-center">Development</h3>
          <p className="narrow text-center">
            Lorem ipsum dolor sit amet, his ea mollis fabellas principes. Quo mazim facilis tincidunt ut, utinam saperet facilisi an vim.
          </p>
          <p className="text-center">
            {/* <a href="" className="btn btn-success btn-outline-rounded green"> Get Quote <span style="margin-left:10px;" className="glyphicon glyphicon-send"></span></a> */}
          </p>
        </div>
        <div className="clearfix"></div>
      </div>
    );
  }
}
