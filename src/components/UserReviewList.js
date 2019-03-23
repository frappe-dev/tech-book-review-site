import React, { Component } from 'react';
import { connect } from 'react-redux';

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
                <h2>This is your review book list</h2>
                <h2>id: {this.props.userID}</h2>
                {JSON.stringify(this.props.reviews)}
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

