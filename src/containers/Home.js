import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

// action
import { getLatestBooksRequested } from '../actions/BookInfoActions';

// header
import AppHeader from '../components/AppHeader';

// component
import LatastBookView from '../components/LatestBookView';

const styles = theme => ({
	margin: {
		margin: theme.spacing.unit,
	},
	input: {
		display: 'none',
	},
});

class Home extends Component {
	handleToSearchPage = () => {
		this.props.history.push('/search')
	}

	handleToMyPage = () => {
		this.props.history.push({
			pathname: '/mypage',
    		state: { userID: "1234" }
 		})
	}

	componentDidMount() {
		this.props.getLatestBooks();
	}

	render() {
		const { classes } = this.props;
		return (
			<div>
				<AppHeader />
				
				<h3>CompileBooks</h3>

				<h4>コンパイルブックスは技術書に特化したレビューサイトです</h4>

				<Button variant="contained" color="primary" className={classes.button} onClick={this.handleToSearchPage}>
					書籍を検索
				</Button>

				<Button variant="contained" color="secondary" className={classes.button} onClick={this.handleToMyPage}>
					マイページ
				</Button>

				<h3>今、注目の10冊</h3>
				<LatastBookView latestBooks={this.props.latestBooks}/>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	latestBooks: state.latestBooks.data
});

const mapDispatchToProps = (dispatch) => {
	return {
		getLatestBooks() {
			dispatch(getLatestBooksRequested());
		}
	}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home)));
