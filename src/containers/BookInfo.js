import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'; //暫定用
import Card from '@material-ui/core/Card';

// component
import BookEvaluation from '../components/BookEvaluation';
import BookDetailCard from '../components/BookDetailCard';

// header
import AppHeader from '../components/AppHeader';

import { getReviewRequested } from '../actions/ReviewActions';
import { Link } from 'react-router-dom';

const styles = theme => ({
	button: {
		margin: theme.spacing.unit,
	},
	input: {
		display: 'none',
	},
	// 書籍詳細カードとバーの間のスペース用
	spacer: {
		margin: theme.spacing.unit,
	}
});

class BookInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bookID: 'BOOK1'
		};
	}

	componentDidMount() {
		let bookID = "x";
		if (this.props.location.state && "bookID" in this.props.location.state) {
			bookID = this.props.location.state.bookID
		}
		this.props.getReview(bookID);
		this.setState({ bookID: bookID });
	}

	render() {
		const { classes, location } = this.props;
		let thumbnailURL = "https://jmva.or.jp/wp-content/uploads/2018/07/noimage.png";
		if (location.state && "thumbnailURL" in location.state) {
			thumbnailURL = location.state.thumbnailURL;
		}
		let title = "none";
		if (location.state && "title" in location.state) {
			title = location.state.title;
		}
		let ISBN = "";
		if (location.state && "ISBN" in location.state) {
			ISBN = location.state.ISBN;
		}
		let description = "";
		if (location.state && "description" in location.state) {
			description = location.state.description;
		}

		return (
			<div>
				<AppHeader />
				<Card className={classes.spacer} />
				<BookDetailCard
					imageSource={thumbnailURL}
					title={title}
					ISBN={ISBN}
					description={description}
					className={classes.card}
				/>
				<Button variant="contained" className={classes.button}>
					Amazonリンク
				</Button>

				<Link to={{
					pathname: "/bookinfo/" + this.state.bookID + "/review",
					state: {
						title: title,
						bookID: this.state.bookID,
						ISBN: ISBN
					}
				}}>
					<Button variant="contained" color="primary" className={classes.button}>
						レビューする
					</Button>
				</Link>

				<Button variant="contained" color="secondary" className={classes.button}>
					気になる
				</Button>
				<BookEvaluation itemData={this.props.reviews} />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	reviews: state.reviews.data
});

const mapDispatchToProps = (dispatch) => {
	return {
		getReview(keyword) {
			dispatch(getReviewRequested(keyword));
		}
	}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BookInfo)));
