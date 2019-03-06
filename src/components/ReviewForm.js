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
import AlertDialog from '../components/AlertDialog'

// action
import { postReviewRequested } from '../actions/ReviewActions';

function checkInputParam(titles, inputParams) {
	if (inputParams.reviewPoint1 === 0) {
		return { result: false, errorMessage: titles.reviewPoint1Title + "を選択してください" };
	} else if (inputParams.reviewPoint2 === 0) {
		return { result: false, errorMessage: titles.reviewPoint2Title + "を選択してください" };
	} else if (inputParams.reviewPoint3 === 0) {
		return { result: false, errorMessage: titles.reviewPoint3Title + "を選択してください" };
	} else if (inputParams.overAllPoints === 0) {
		return { result: false, errorMessage: titles.overAllPointsTitle + "を選択してください" };
	} else if (inputParams.motivationFreeText.length > 100) {
		return { result: false, errorMessage: titles.motivationSuitableLevelTitle + "は100文字以内で入力してください" };
	} else if (inputParams.freeWriting.length > 200) {
		return { result: false, errorMessage: titles.freeWritingTitle + "は200文字以内で入力してください" };
	} else {
		return { result: true, errorMessage: "" };
	}
}


function isMotivationSuitableLevelDisabled(motivationFreeText) {
	if (motivationFreeText === "") {
		return true;
	} else {
		return false;
	}
}

const styles = theme => ({
	button: {
		margin: theme.spacing.unit,
	},
});

class ReviewForm extends React.Component {
	constructor(props) {
		super(props);
		this.updateState = this.updateState.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.state = {
			reviewPoint1: 0,
			reviewPoint2: 0,
			reviewPoint3: 0,
			overAllPoints: 0,
			motivationFreeText: "",
			motivationSuitableLevel: 0,
			recomendReaderLevel: "",
			freeWriting: "",
			canPutParams: true,
			inputParamsErrorMessage: "",
		};
	}

	updateState(state) {
		this.setState(state);
		this.props.updateState(state);
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
			this.props.history.push('/login');
			return;
		}
		let checkInputParamResult = checkInputParam(this.props, this.state)
		this.setState({
			canPutParams: checkInputParamResult.result,
			inputParamsErrorMessage: checkInputParamResult.errorMessage,
		})
		if (checkInputParamResult.result) {
			let ISBN = this.props.ISBN;
			if (!ISBN) {
				ISBN = "-";
			}
			let params = {
				bookID: this.props.bookID,
				userID: userID,
				overallpoints: this.state.overAllPoints,
				evaluation: [
					{ key: this.props.reviewPoint1Title, value: this.state.reviewPoint1 },
					{ key: this.props.reviewPoint2Title, value: this.state.reviewPoint2 },
					{ key: this.props.reviewPoint3Title, value: this.state.reviewPoint3 },
					{ key: this.props.freeWordInputTitle, value: this.state.motivationFreeText, suitableLevel: this.state.motivationSuitableLevel },
					{ key: this.props.recomendReaderLevelTitle, value: this.state.recomendReaderLevel },
					{ key: this.props.freeWritingTitle, value: this.state.freeWriting }
				],
				ISBN: ISBN,
			};
			this.props.postReview(params);
		}
	}

	render() {
		const { classes } = this.props;
		console.log(this.state);
		return (
			<form>
				<AlertDialog
					title={this.state.inputParamsErrorMessage}
					isOpen={!this.state.canPutParams}
					updateState={this.updateState}
				/>
				<EvaluationRadioButtons
					updateState={this.updateState}
					title={this.props.reviewPoint1Title}
					reviewKeyName="reviewPoint1"
				/>
				<br />
				<EvaluationRadioButtons
					updateState={this.updateState}
					title={this.props.reviewPoint2Title}
					reviewKeyName="reviewPoint2"
				/>
				<br />
				<EvaluationRadioButtons
					updateState={this.updateState}
					title={this.props.reviewPoint3Title}
					reviewKeyName="reviewPoint3"
				/>
				<br />
				<EvaluationRadioButtons
					updateState={this.updateState}
					title={this.props.overAllPointsTitle}
					reviewKeyName="overAllPoints"
				/>
				<br />
				<FreeWordInput
					updateState={this.updateState}
					reviewKeyName="motivationFreeText"
					label={this.props.freeWordInputTitle}
				/>
				<br />
				<EvaluationRadioButtons
					updateState={this.updateState}
					title={this.props.motivationSuitableLevelTitle}
					reviewKeyName="motivationSuitableLevel"
					disabled={isMotivationSuitableLevelDisabled(this.state.motivationFreeText)}
				/>
				<br />
				<EvaluationSelector
					updateState={this.updateState}
					reviewKeyName="recomendReaderLevel"
					label={this.props.recomendReaderLevelTitle}
				/>
				<br />
				<FreeWordInput
					updateState={this.updateState}
					reviewKeyName="freeWriting"
					label={this.props.freeWritingTitle}
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
