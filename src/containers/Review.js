import React, { Component } from 'react';
import { withRouter } from 'react-router';

import ReviewForm from '../components/ReviewForm'

class Review extends Component {
	constructor(props) {
		super(props);
      	this.state = {
			reviewPoint: ''
		};
		this.updateState = this.updateState.bind(this);
    }

	updateState(state){
		this.setState(state);
	}

    render() {
		const { classes, location } = this.props;
        return (
            <div>
                <h2>this is review page</h2>
                <h2>{location.state.tiltle}</h2>

                <ReviewForm
                    updateState={this.updateState}
                    bookID={location.state.bookID}
                    ISBN={location.state.ISBN}
                />
            </div>
        );
    }
}

export default withRouter(Review);
