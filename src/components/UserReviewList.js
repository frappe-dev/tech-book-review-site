import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// component
import BookCard from '../components/BookCard';
import ErrorBoundary from '../components/ErrorBoundary';

// action
import { getUserReviews } from '../actions/UserRecordActions';

class UserReviewList extends Component {

    componentDidMount() {
        this.props.getReviews(this.props.userID);
    }

    render() {
        console.log(this.props.reviews)
        return (
            <div>
                {
                    this.props.reviews && "Items" in this.props.reviews && this.props.reviews.Items.map((item, index) =>
                        <div key={index}>
                            <ErrorBoundary>
                                <Link to={{
                                    pathname: "/bookinfo/" + item.bookID,
                                }}>

                                    <BookCard
                                        bookID={item.bookID}
                                        thumbnailURL={item.bookInfo.thumbnailURL ? item.bookInfo.thumbnailURL : "https://jmva.or.jp/wp-content/uploads/2018/07/noimage.png"}
                                        title={item.bookInfo.title}
                                        index={index}
                                    />
                                </Link>
                            </ErrorBoundary>
                        </div>
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    reviews: state.userReviews.data
});

const mapDispatchToProps = (dispatch) => {
    return {
        getReviews(userID) {
            dispatch(getUserReviews(userID));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserReviewList);

