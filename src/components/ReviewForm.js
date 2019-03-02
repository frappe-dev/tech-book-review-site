import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Auth } from 'aws-amplify';

// component
import EvaluationRadioButtons from '../components/EvaluationRadioButtons';
import FreeWordInput from '../components/FreeWordInput'
import EvaluationSelector from '../components/EvaluationSelector'

// action
import { postReviewRequested } from '../actions/ReviewActions';

class ReviewForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			reviewPoint1: '',
			reviewPoint2: '',
			reviewPoint3: '',
			reviewPoint4: '',
			reviewPoint5: '',
			reviewPoint6: '',
			reviewPoint7: '',
		};
		this.updateState = this.updateState.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	updateState(state) {
		this.setState(state);
		this.props.updateState(state);
		console.log(this.state);
	}

	async onSubmit() {
		console.log(this.state);
		// check isAuthenticated
		let auth = false;
		let userID = "";
		await Auth.currentAuthenticatedUser()
			.then(data => {
				auth = true;
				console.log(data);
				//console.log(data.attributes.sub) // -> Cognito User
				//console.log(data.id) // -> facebook or google
				if ("id" in data) {
					userID = data.id;
				} else if ("attributes" in data && "sub" in data.attributes) {
					userID = data.attributes.sub;
				} else {
					console.log("[ERROR]cannot parse userID"); // -> TODO: error throw
				}
			}).catch(err => {
				auth = false;
				console.log(err);
			})
		if (!auth) {
			this.props.history.push('/login')
			return;
		}
		console.log("userID: " + userID);
		let ISBN = this.props.ISBN;
		if (!ISBN) {
			ISBN = "-"
		}
		console.log("ISBN: " + ISBN);
		console.log("BookID: " + this.props.bookID);
		let params = {
			bookID: this.props.bookID,
			userID: userID,
			overallpoints: "3", //TODO: formに追加する
			evaluation: {
				param1: this.state.reviewPoint1,
				param2: this.state.reviewPoint2,
				param3: this.state.reviewPoint3,
				param4: this.state.reviewPoint4,
				param5: this.state.reviewPoint5,
				param6: this.state.reviewPoint6,
				param7: this.state.reviewPoint7,
			},
			ISBN: ISBN,
		}
		this.props.postReview(params);
	}

	render() {
		return (
			<form>
				<EvaluationRadioButtons
					updateState={this.updateState}
					title="文章の読みやすさ"
					reviewKeyName="reviewPoint1"
				/>
				<br />
				<EvaluationRadioButtons
					updateState={this.updateState}
					title="図や例の多さ"
					reviewKeyName="reviewPoint2"
				/>
				<br />
				<EvaluationRadioButtons
					updateState={this.updateState}
					title="内容の正確さ"
					reviewKeyName="reviewPoint3"
				/>
				<br />
				<EvaluationRadioButtons
					updateState={this.updateState}
					title="全体的な満足度"
					reviewKeyName="reviewPoint4"
				/>
				<br />
				<FreeWordInput
					updateState={this.updateState}
					reviewKeyName="reviewPoint5"
					label="買った動機（任意）"
				/>
				<br />
				<FreeWordInput
					updateState={this.updateState}
					reviewKeyName="reviewPoint6"
					label="動機に適していたか（任意）"
				/>
				<br />
				<EvaluationSelector
					updateState={this.updateState}
					reviewKeyName="reviewPoint7"
					label="読んでほしい読者のレベル（任意）"
				/>
				<br />
				<button type="button" name="submit" onClick={this.onSubmit}>送信</button>
			</form>
		)
	}
}

const mapStateToProps = (state) => ({
	a: state.test //無意味
});

const mapDispatchToProps = (dispatch) => {
	return {
		postReview(keyword) {
			dispatch(postReviewRequested(keyword));
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ReviewForm));
