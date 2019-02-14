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
		const { location } = this.props;
		console.log(location.state.title["title"]);
		return (
			<div>
				<h2>this is review page</h2>
				{location.state.title["title"]}

				<ReviewForm
					updateState={this.updateState}
					bookID={location.state.bookID}
					ISBN={location.state.ISBN["ISBN"]}
					/>
			</div>
		);
	}
}

export default withRouter(Review);
