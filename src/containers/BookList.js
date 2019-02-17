import React, { Component } from 'react';

class BookList extends Component {

	componentDidMount() {
		// ここでAPIを叩いて対象の書籍一覧を取得
	}

    render() {
		const { location } = this.props;
        return (
            <div>
				<h2>Your userID is {location.state.userID}</h2>
                <h2>this is {location.state.booklistType} booklist</h2>
            </div>
        );
    }
}

export default BookList;
