import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import ReviewForm from '../components/ReviewForm';

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: "",
    };
  }

  submit(values) {
    this.props.onSubmit(values.keyword);
  }

  render() {
      return (
          <div>
              <h2>this is review</h2>
              <span>
                  <ReviewForm onSubmit={this.submit.bind(this)}/>
              </span>
          <h4>{this.props.review}</h4>
          </div>
      );
  }
}

const mapStateToProps = (state) => ({
  review: state.review,
});

const mapDispatchToProps = (dispatch) => ({
  reviewItems: (data) => {
      dispatch(reviewItems(data))
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Review));
