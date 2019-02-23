import React, { Component } from 'react';

class FavoriteBookList extends Component {

    render() {
        return (
            <div>
				<h2>This is your favorite book list</h2>
				<h2>{this.props.userID}</h2>
            </div>
        );
    }
}

export default FavoriteBookList;
