import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// component
import SearchForm from '../components/SearchForm';
import SearchedBookCards from '../components/SearchedBookCards';
// redux
import { searchBookRequested } from '../actions/SearchActions';
// header
import AppHeader from '../components/AppHeader';

class Search extends Component {
	submit(values) {
		this.props.onSubmit(values.keyword);
	}

	render() {
		let shownBookCount = 0;
		let shownBookCountText = "";
		// undefinedチェック
		if( this.props.books === void 0){
			shownBookCountText = "";
		} else {
			shownBookCount = this.props.books.length;
			if shownBookCount > 0 {
				shownBookCountText = shownBookCount + "個の書籍を表示中"
			} else {
				shownBookCountText = "現在のキーワードではヒットする書籍がありません"
			}

		}
		return (
			<div>
				<AppHeader />
				<h2>this is search page</h2>

				<span>
					<SearchForm onSubmit={this.submit.bind(this)}/>
				</span>
				{shownBookCountText}
				<SearchedBookCards itemData={this.props.books}/>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	books: state.bookList.data
});


const mapDispatchToProps = (dispatch) => {
	return {
		onSubmit(keyword) {
			dispatch(searchBookRequested(keyword));
		}
	}
};

/*
const と functionの使い方が理解できていない。(どちらでも動く)
function mapDispatchToProps(dispatch) {
return {
onSubmit(keyword) {
dispatch(getBookList(keyword));
}
};
}
*/

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
