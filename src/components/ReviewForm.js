import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import ReviewAnItem from '../components/ReviewAnItem';
import { reviewItems } from '../actions/ReviewActions';

const ReviewForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
      <form onSubmit={handleSubmit}>
          <ReviewAnItem
              reviewItem="読みやすさ"
          />

          <Button
              type="submit"
              disabled={submitting || pristine}>
              投稿
          </Button>
          <Button
              type="button"
              onClick={reset}
              disabled={submitting || pristine}>
              クリア
          </Button>
      </form>
      );
};


export default reduxForm({
  form: 'review-form',
  onSubmit(values, dispatch) {
      dispatch(reviewItems(values));
  },
})(ReviewForm);
