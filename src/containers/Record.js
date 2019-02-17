import React, { Component } from 'react';

// レビュー済みor気になるした書籍一覧（location.state.booklistTypeで出し分け）
class Record extends Component {

	componentDidMount() {
		// ここでAPIを叩いて対象の書籍一覧を取得
	}

    render() {
		const { location } = this.props;
        return (
            <div>
				<h2>Your userID is {location.state.userID}</h2>
                <h2>this is {location.state.recordType} record</h2>
            </div>
        );
    }
}

export default Record;
