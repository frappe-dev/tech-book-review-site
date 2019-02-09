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
      review: "",
    };
    this.updateState = this.updateState.bind(this);
  }

  updateState(state){
    this.setState(state);
  }

  onSubmit(){
    console.log(this.state);
  }

    render() {
    const { classes, location } = this.props;

    const alt = "image"+location.key;
    let thumbnailURL = "https://jmva.or.jp/wp-content/uploads/2018/07/noimage.png";
    if (location.state && "thumbnailURL" in location.state) {
        thumbnailURL = location.state.thumbnailURL;
    }
    let title = "none";
    if (location.state && "title" in location.state) {
        title = location.state.title
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
                <span>
                    <ReviewForm
                    onSubmit={this.onSubmit}
                    updateState={this.updateState}
                    />
                </span>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(BookInfo));
