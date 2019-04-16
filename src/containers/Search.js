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
		let resultLabel = "";
		// undefinedチェック
		if (this.props.searchedBooksInfo === void 0) {
			shownBookCountText = "";
		} else {
			shownBookCount = this.props.searchedBooksInfo.length;
			if (shownBookCount > 0) {
				shownBookCountText = shownBookCount + "冊の書籍を表示中";
				resultLabel = "検索結果"
			} else {
				shownBookCountText = "現在のキーワードではヒットする書籍がありません";
			}
		}
		
		return (
			<div>
				<AppHeader />
				<h2>フリーワード検索</h2>
				<h4>本のタイトル、言語名、技術名などを入力して検索してください。</h4>
				<h4>例えば… リーダブルコード や JavaScript や AWS など。</h4>

				<span>
					<SearchForm onSubmit={this.submit.bind(this)} />
				</span>
				<h2>{shownBookCountText}</h2>
				<h2>{resultLabel}</h2>
				<SearchedBookCards itemData={this.props.searchedBooksInfo} appInfoForBooks={this.props.appInfoForBooks}/>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	searchedBooksInfo: state.booksInfo.searchedBooksInfo,
	appInfoForBooks  : state.booksInfo.appInfoForBooks
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
