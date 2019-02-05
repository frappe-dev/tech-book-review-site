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
			reviewPoint: ''
		};
		this.updateState = this.updateState.bind(this);
	}
	updateState(state){
		this.setState(state);
	}

    render() {
    const { classes, location } = this.props;

    const alt = "image"+location.key;
    const thumbnailURL = location.state.thumbnailURL;
    const title = location.state.title
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
                />
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(BookInfo));
