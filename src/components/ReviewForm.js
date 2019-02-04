import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import ReviewAnItem from '../components/ReviewAnItem';
import { reviewItems } from '../actions/ReviewActions';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            読みやすさ: ''
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
      return (
        <form onSubmit={this.onSubmit}>
        <ReviewAnItem
            reviewItem="読みやすさ"
            updateState={this.updateState}
        />
        <Button
            type="submit"
            disabled={false}>
            検索
        </Button>
    </form>
       )
    }
}
