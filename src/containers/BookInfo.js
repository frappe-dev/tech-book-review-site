import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'; //暫定用

import ReviewForm from '../components/ReviewForm'

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
			tiltle     : '',
			thumbnailURL:'',
			bookID: '',
			ISBN:''
		};
		this.updateState = this.updateState.bind(this);
    }

	updateState(state){
		this.setState(state);
	}

	handleToReview = () => {
        this.props.history.push({
    		pathname: "/review",
    		state: { tiltle : "TestTitle"}
		});
    }

    render() {
        const { classes, location } = this.props;

        let bookID = "xx";
        if (location.state && "bookID" in location.state) {
            bookID = location.state.bookID
			this.state.bookID = bookID
        }

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

                <Button variant="contained" color="primary" className={classes.button} onClick={this.handleToReview}>
                    レビューする
                </Button>

                <Button variant="contained" color="secondary" className={classes.button}>
                    気になる
                </Button>

                <ReviewForm
                    updateState={this.updateState}
                    bookID={bookID}
                    ISBN={ISBN}
                />
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(BookInfo));
