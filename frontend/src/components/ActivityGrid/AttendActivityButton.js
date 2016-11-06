import React, {Component} from 'react';
import {connect} from 'react-redux';

import {attendActivity} from '../../actions';

export class AttendActivityButton extends Component {
    render() {
        const { activity, attendActivity } = this.props;
        return (
            <button onClick={() => attendActivity(activity)} type="button" className="btn btn-success">
                <span className="glyphicon" bsStyle="primary" aria-hidden="true"></span>
                Attend
            </button>
        );
    }
}

export const AttendActivityButtonContainer = connect(() => ({}), {
    attendActivity
},)(AttendActivityButton);
