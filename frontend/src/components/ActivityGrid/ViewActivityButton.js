import React, {Component} from 'react';
import {connect} from 'react-redux';

import {viewActivity} from '../../actions';

export class ViewActivityButton extends Component {
    render() {
        const {activity, viewActivity} = this.props;
        return (
            <button onClick={() => viewActivity(activity)} type="button" bsStyle="default" className="btn btn-success">
                <span className="glyphicon" aria-hidden="true"></span>
                View
            </button>
        );
    }
}

export const ViewActivityButtonContainer = connect(() => ({}), {
    viewActivity
},)(ViewActivityButton);
