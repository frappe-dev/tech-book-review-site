import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'; //暫定用

import ReviewForm from '../components/ReviewForm'
import { getReviewRequested } from '../actions/ReviewActions';

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
			reviewPoint: '',
            bookID: 'BOOK1'
        };
		this.updateState = this.updateState.bind(this);
    }
    
	updateState(state){
		this.setState(state);
    }
    
            
    componentDidMount() {
        let bookID = "x";
        if (this.props.location.state && "bookID" in this.props.location.state) {
            bookID = this.props.location.state.bookID
        }
        console.log("bookID: "+bookID);
        this.props.getReview(bookID);
	this.setState({ bookID: bookID });
    }

    render() {
        const { classes, location } = this.props;
        const alt = "image" + location.key;
        let thumbnailURL = "https://jmva.or.jp/wp-content/uploads/2018/07/noimage.png";
        if (location.state && "thumbnailURL" in location.state) {
            thumbnailURL = location.state.thumbnailURL;
        }
        let title = "none";
        if (location.state && "title" in location.state) {
            title = location.state.title
        }
        let ISBN = "";
        if (location.state && "ISBN" in location.state) {
            ISBN = location.state.ISBN
        }
	console.log("state bookID: ");
	console.log(this.state.bookID);
	let bookID = "";
        if (location.state && "bookID" in location.state) {
            bookID = location.state.bookID
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

                <Button variant="contained" color="primary" className={classes.button}>
                    レビューする
                </Button>
                <Button variant="contained" color="secondary" className={classes.button}>
                    気になる
                </Button>
                <ReviewForm
                    updateState={this.updateState}
                    bookID={this.state.bookID}
                    ISBN={ISBN}
                />

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
