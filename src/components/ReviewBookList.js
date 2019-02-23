import React, { Component } from 'react';

class ReviewBookList extends Component {

    render() {
        return (
            <div>
				<h2>This is your review book list</h2>
				<h2>{this.props.userID}</h2>
            </div>
        );
    }
}

export default ReviewBookList;
