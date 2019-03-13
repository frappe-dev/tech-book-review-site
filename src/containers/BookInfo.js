import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'; //暫定用
import Card from '@material-ui/core/Card';
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';

// component
import BookEvaluation from '../components/BookEvaluation';
import BookDetailCard from '../components/BookDetailCard';
import BookReviewList from '../components/BookReviewList';
import AmazonLinkButton from '../components/AmazonLinkButton';

// action
import { postBookLikeRequested } from '../actions/BookLikeActions';
import { getReviewRequested } from '../actions/ReviewActions';

// header
import AppHeader from '../components/AppHeader';

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
			bookID: '',
			title: '',
			thumbnailURL: '',
			ISBN: '',
			amazonLink: '',
		};
	}

	componentDidMount() {

		let bookID = "";
		if (this.props.location.state && "bookID" in this.props.location.state) {
			bookID = this.props.location.state.bookID
		}
		this.props.getReview(bookID);
		this.setState({ bookID: bookID });

		let thumbnailURL = "https://jmva.or.jp/wp-content/uploads/2018/07/noimage.png";
		if (this.props.location.state && "thumbnailURL" in this.props.location.state) {
			thumbnailURL = this.props.location.state.thumbnailURL;
		}
		this.setState({ thumbnailURL: thumbnailURL })

		let title = "none";
		if (this.props.location.state && "title" in this.props.location.state) {
			title = this.props.location.state.title;
		}
		this.setState({ title: title });

		let ISBN = "";
		if (this.props.location.state && "ISBN" in this.props.location.state) {
			ISBN = this.props.location.state.ISBN;
		}
		this.setState({ ISBN: ISBN });

		let ISBN10 = "";
		let amazonLink = "";
		if (this.props.location.state && "ISBN10" in this.props.location.state && this.props.location.state.ISBN10 !== "") {
			ISBN10 = this.props.location.state.ISBN10;
			amazonLink = "https://www.amazon.co.jp/dp/" + ISBN10 + "/ref=&tag=ayathuzithuka-22";
		}
		this.setState({ amazonLink: amazonLink });
	}

	async onClickLikeButton() {
		console.log("onClickLikeButton is called");
		// Auth check
		let auth = false;
		let userID = "";
		await Auth.currentAuthenticatedUser()
			.then(data => {
				auth = true;
				console.log(data);
				//console.log(data.attributes.sub) // -> Cognito User
				//console.log(data.id) // -> facebook or google
				if ("id" in data) {
					userID = data.id;
				} else if ("attributes" in data && "sub" in data.attributes) {
					userID = data.attributes.sub;
				} else {
					console.log("[ERROR]cannot parse userID"); // -> TODO: error throw
				}
			}).catch(err => {
				auth = false;
				console.log(err);
			})
		if (!auth) {
			this.props.history.push('/login');
			return;
		}
		let postData = {
			bookID: this.state.bookID,
			userID: userID,
			bookInfo: {
				title: this.state.title,
				thumbnailURL: this.state.thumbnailURL,
				ISBN: this.state.ISBN
			}
		};
		this.props.postBookLike(postData);
	}

	render() {
		const { classes, location } = this.props;

		let description = "";
		if (location.state && "description" in location.state) {
			description = location.state.description;
		}

		return (
			<div>
				<AppHeader />
				<Card className={classes.spacer} />
				<BookDetailCard
					imageSource={this.state.thumbnailURL}
					title={this.state.title}
					ISBN={this.state.ISBN}
					description={description}
					className={classes.card}
				/>

				<AmazonLinkButton
					amazonLink={this.state.amazonLink}
					title={this.state.title}
				/>

				<Link to={{
					pathname: "/bookinfo/" + this.state.bookID + "/review",
					state: {
						title: this.state.title,
						bookID: this.state.bookID,
						ISBN: this.state.ISBN
					}
				}}>
					<Button variant="contained" color="primary" className={classes.button}>
						レビューする
					</Button>
				</Link>

				<Button variant="contained" color="secondary" className={classes.button} onClick={this.onClickLikeButton.bind(this)}>
					気になる
				</Button>
				<BookEvaluation itemData={this.props.reviews} />
				<BookReviewList reviews={this.props.reviews} />
			</div >
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
		},
		postBookLike(postData) {
			dispatch(postBookLikeRequested(postData));
		}
	}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BookInfo)));
