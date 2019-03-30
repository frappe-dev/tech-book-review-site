import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

// component
import BookCard from '../components/BookCard';
import ErrorBoundary from '../components/ErrorBoundary';

// action
import { getUserLikes } from '../actions/UserRecordActions';

const styles = theme => ({
    card: {
        margin: theme.spacing.unit,
    },
});

class UserLikeList extends Component {

    componentDidMount() {
        this.props.getLikes(this.props.userID);
    }

    render() {
        console.log(this.props.likes)
        const { classes } = this.props;
        return (
            <div>
                <h2>This is your like book list</h2>
                <h2>id: {this.props.userID}</h2>
                {
                    this.props.likes && "Items" in this.props.likes && this.props.likes.Items.map((item, index) =>
                        <ErrorBoundary>
                            <div key={index}>
                                <Link to={{
                                    pathname: "/bookinfo/" + item.bookID,
                                }}>
                                    <BookCard
                                        bookID={item.bookID}
                                        thumbnailURL={item.bookInfo.thumbnailURL ? item.bookInfo.thumbnailURL : "https://jmva.or.jp/wp-content/uploads/2018/07/noimage.png"}
                                        title={item.bookInfo.title}
                                        index={index}
                                        className={classes.card}
                                    />

                                </Link>
                            </div>
                        </ErrorBoundary>
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    likes: state.userLikes.data
});

const mapDispatchToProps = (dispatch) => {
    return {
        getLikes(userID) {
            dispatch(getUserLikes(userID));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserLikeList));

