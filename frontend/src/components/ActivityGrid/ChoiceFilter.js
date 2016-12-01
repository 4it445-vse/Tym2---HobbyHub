import React, { Component } from 'react';
import Select from 'react-select';

export class ChoiceFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      value: [],
    };
  }

	handleSelectChange = (value) => {
		console.log('You\'ve selected:', value);
		this.setState({ value });
	}

  updateState = (name) => {
    this.setState({options: [
      {label: name, value: name}
    ]})
  }


	render () {

		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select multi simpleValue
          value={this.state.value}
          placeholder={this.props.placeholder}
          options={this.props.data}
          onChange={this.handleSelectChange} />

			</div>
		);
	}
};
