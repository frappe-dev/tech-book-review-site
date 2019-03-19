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

// action
import { postBookLikeRequested } from '../actions/BookLikeActions';
import { getReviewRequested } from '../actions/ReviewActions';
import { getBookInfoByBookidRequested } from '../actions/SearchActions';

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
		this.setState.bind(this);
		this.state = {
			bookID: "",
			title: "",
			thumbnailURL: "",
			ISBN10: "",
			amazonLink: "",
			description: "",
		};
	}

	componentDidMount() {
		let bookID = "";
		if (this.props.location.state) {
			if ("bookID" in this.props.location.state) {
				bookID = this.props.location.state.bookID
			}
			let thumbnailURL = "https://jmva.or.jp/wp-content/uploads/2018/07/noimage.png";
			if ("thumbnailURL" in this.props.location.state) {
				thumbnailURL = this.props.location.state.thumbnailURL;
			}
			let title = "";
			if ("title" in this.props.location.state) {
				title = this.props.location.state.title;
			}
			let ISBN10 = "";
			let amazonLink = "";
			if ("ISBN10" in this.props.location.state && this.props.location.state.ISBN10 !== "") {
				ISBN10 = this.props.location.state.ISBN10;
				amazonLink = "https://www.amazon.co.jp/dp/" + ISBN10 + "/ref=&tag=ayathuzithuka-22";
			}
			let description = "";
			if ("description" in this.props.location.state) {
				description = this.props.location.state.description;
			}
			this.setState({
				bookID: bookID,
				thumbnailURL: thumbnailURL,
				title: title,
				ISBN10: ISBN10,
				amazonLink: amazonLink,
				description: description
			});
			this.props.getReview(bookID);
		} else {
			// BookIDが無い場合,URLからBookIDを取得し、書籍情報を取得
			this.props.getBookData(this.props.match.params.id);
		}
	}

	componentDidUpdate() {
		// getBookDataのレスポンスでpropsが更新されるとここが呼ばれる
		if (this.state.bookID === "" && this.props.book) {
			let bookID = "";
			if (this.props.book.id) {
				bookID = this.props.book.id
			}
			if (this.props.book.volumeInfo !== void 0) {
				let thumbnailURL = "https://jmva.or.jp/wp-content/uploads/2018/07/noimage.png";
				if ("imageLinks" in this.props.book.volumeInfo) {
					thumbnailURL = this.props.book.volumeInfo.imageLinks.thumbnail;
				}
				let title = "";
				if ("title" in this.props.book.volumeInfo) {
					title = this.props.book.volumeInfo.title;
				}
				let ISBN10 = "";
				let description = "";
				if ("industryIdentifiers" in this.props.book.volumeInfo) {
					let industryIdentifiers = this.props.book.volumeInfo.industryIdentifiers;
					// industryIdentifiersの0 or 1 行目に入っているので、typeを見て取り出す
					industryIdentifiers.forEach(industryIdentifier => {
						if (industryIdentifier.type === "ISBN_10") {
							console.log("in")
							ISBN10 = industryIdentifier.identifier;
						}
					});
				}
				if ("description" in this.props.book.volumeInfo) {
					description = this.props.book.volumeInfo.description;
				}
				this.setState({
					bookID: bookID,
					title: title,
					thumbnailURL: thumbnailURL,
					ISBN10: ISBN10,
					amazonLink: (ISBN10 !== "") ? "https://www.amazon.co.jp/dp/" + ISBN10 + "/ref=&tag=ayathuzithuka-22" : "",
					description: description,
				});
				this.props.getReview(bookID);
			}
		}
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
				ISBN10: this.state.ISBN10
			}
		};
		this.props.postBookLike(postData);
	}

	render() {
		const { classes } = this.props;

		return (
			<div>
				<AppHeader />
				<Card className={classes.spacer} />
				<BookDetailCard
					imageSource={this.state.thumbnailURL}
					title={this.state.title}
					description={this.state.description}
					className={classes.card}
				/>

				{(() => {
					// ISBN10があり、AmazonへのLinkが生成されなければAmazonボタンを表示しない
					if (this.state.amazonLink && this.state.amazonLink !== "") {
						return (
							<a href={this.state.amazonLink} target="_blank" rel="noreferrer noopener">
								<Button variant="contained" className={classes.button}>
									Amazonリンク
								</Button>
							</a>
						);
					}
				})()}

				<Link to={{
					pathname: "/bookinfo/" + this.state.bookID + "/review",
					state: {
						title: this.state.title,
						bookID: this.state.bookID,
						ISBN10: this.state.ISBN10,
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
	reviews: state.reviews.data,
	book: state.specificBook.data,
});

const mapDispatchToProps = (dispatch) => {
	return {
		getReview(keyword) {
			dispatch(getReviewRequested(keyword));
		},
		postBookLike(postData) {
			dispatch(postBookLikeRequested(postData));
		},
		getBookData(bookId) {
			dispatch(getBookInfoByBookidRequested(bookId));
		}
	}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BookInfo)));
