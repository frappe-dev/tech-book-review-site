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
        return (
            <div>
                <h2>this is review page</h2>
                <div>
                    tiltle: {this.props.location.state.title}のレビューページ
                </div>

                <ReviewForm
                    updateState={this.props.updateState}
                    bookID={this.props.bookID}
                    ISBN={this.props.ISBN}
                />
            </div>
        );
    }
}

export default withRouter(Review);
