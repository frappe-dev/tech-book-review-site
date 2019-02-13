import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'; //暫定用

import { getReviewRequested } from '../actions/ReviewActions';
import { Link } from 'react-router-dom';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
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
        const alt = "image" + location.key;
        let thumbnailURL = "https://jmva.or.jp/wp-content/uploads/2018/07/noimage.png";
        if (location.state && "thumbnailURL" in location.state) {
            thumbnailURL = location.state.thumbnailURL;
			this.state.thumbnailURL = thumbnailURL
        }
        let title = "none";
        if (location.state && "title" in location.state) {
            title = location.state.title
			this.state.title = title
        }
        let ISBN = "";
        if (location.state && "ISBN" in location.state) {
            ISBN = location.state.ISBN
			this.state.ISBN = ISBN
        }

        return (
            <div>
                <h2>this is bookinfo page</h2>
                <div>
                    tiltle: {title}
                </div>

                <div>
                    <img src={thumbnailURL} alt={alt} className="thumbnail" />
                </div>

                <div>
                    ISBN: {ISBN}
                </div>

                <div>
                    概要：
                </div>

                <Button variant="contained" className={classes.button}>
                    Amazonリンク
                </Button>

				{// {title}で渡すと落ちるので仮置き
			}
				<Link to={{
		            pathname: "/review",
		            state: {
		                tiltle : "testTitle",
						bookID : "1234",
	                    ISBN   : "1234"
		                }
		            }}>
					<Button variant="contained" color="primary" className={classes.button}>
	                    レビューする
	                </Button>
		        </Link>

                <Button variant="contained" color="secondary" className={classes.button}>
                    気になる
                </Button>

                <h1>
                    {JSON.stringify(this.props.reviews)}
                </h1>
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
