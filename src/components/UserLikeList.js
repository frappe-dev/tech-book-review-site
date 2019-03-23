import React, { Component } from 'react';
import { connect } from 'react-redux';

// action
import { getUserLikes } from '../actions/UserRecordActions';

class UserLikeList extends Component {

    componentDidMount() {
        this.props.getLikes(this.props.userID);
    }

    render() {
        console.log(this.props.likes)
        return (
            <div>
                <h2>This is your like book list</h2>
                <h2>id: {this.props.userID}</h2>
                {JSON.stringify(this.props.likes)}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserLikeList);

