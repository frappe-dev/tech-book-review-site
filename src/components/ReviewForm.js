import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Auth } from 'aws-amplify';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

// component
import EvaluationRadioButtons from '../components/EvaluationRadioButtons';
import FreeWordInput from '../components/FreeWordInput'
import EvaluationSelector from '../components/EvaluationSelector'

// action
import { postReviewRequested } from '../actions/ReviewActions';

const styles = theme => ({
	button: {
		margin: theme.spacing.unit,
	},
});

class ReviewForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			reviewPoint1: '',
			reviewPoint2: '',
			reviewPoint3: '',
			overAllPoints: '',
			motivationFreeText: '',
			motivationSuitableLevel: '',
			motivationSuitableLevelDisabled: true,
			reccomendReaderLevel: '',
		};
		this.updateState = this.updateState.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	updateState(state) {
		this.setState(state);
		this.props.updateState(state);
		if (this.state.motivationFreeText === "") {
			this.setState({ motivationSuitableLevelDisabled: true });
		} else {
			this.setState({ motivationSuitableLevelDisabled: false });
		}
		console.log(this.state);
	}

	async onSubmit() {
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
		let ISBN = this.props.ISBN;
		if (!ISBN) {
			ISBN = "-"
		}
		let params = {
			bookID: this.props.bookID,
			userID: userID,
			overallpoints: this.state.overAllPoints,
			evaluation: {
				param1: this.state.reviewPoint1,
				param2: this.state.reviewPoint2,
				param3: this.state.reviewPoint3,
				param4: this.state.motivationFreeText,
				param5: this.state.motivationSuitableLevel,
				param6: this.state.reccomendReaderLevel,
			},
			ISBN: ISBN,
		}
		console.log(params);
		this.props.postReview(params);
	}

	render() {
		const { classes } = this.props;
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
					reviewKeyName="overAllPoints"
				/>
				<br />
				<FreeWordInput
					updateState={this.updateState}
					reviewKeyName="motivationFreeText"
					label="買った動機（任意）"
				/>
				<br />
				<EvaluationRadioButtons
					updateState={this.updateState}
					title="動機に適していたか"
					reviewKeyName="motivationSuitableLevel"
					disabled={this.state.motivationSuitableLevelDisabled}
				/>
				<br />
				<EvaluationSelector
					updateState={this.updateState}
					reviewKeyName="reccomendReaderLevel"
					label="読んでほしい読者のレベル（任意）"
				/>
				<br />
				<Button variant="contained" color="secondary" className={classes.button} onClick={this.onSubmit}>
					送信
				</Button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ReviewForm)));
