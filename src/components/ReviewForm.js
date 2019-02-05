import React from 'react';
import ReviewItem from '../components/ReviewItem';

export default class ReviewForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviewPoint: ''
        };
        this.updateState = this.updateState.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    updateState(state) {
        this.setState(state);
        this.props.updateState(state);
    }
    onSubmit(){
          console.log(this.state);
    }

    render() {
      	return (
		  	<form>
			  	<ReviewItem
				  	updateState={this.updateState}
				  	/>
			  	<button type="button" name="submit" onClick={this.onSubmit}>送信</button>
		  	</form>
	  	)
  	}
}
