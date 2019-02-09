import React from 'react';
import EvaluationRadioButtons from '../components/EvaluationRadioButtons';

export default class ReviewForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviewPoint1: '',
			reviewPoint2: '',
			reviewPoint3: '',
			reviewPoint4: '',
			reviewPoint5: ''
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
			  	<EvaluationRadioButtons
				  	updateState={this.updateState}
					title="ページ構成の読みやすさ"
					reviewKeyName="reviewPoint1"
				/>
				<br/>
				<EvaluationRadioButtons
				  	updateState={this.updateState}
					title="内容の正確さ"
					reviewKeyName="reviewPoint2"
				/>
				<br/>
				<EvaluationRadioButtons
					updateState={this.updateState}
					title="サンプルが実行可能"
					reviewKeyName="reviewPoint3"
				/>
				<br/>
				<EvaluationRadioButtons
					updateState={this.updateState}
					title="想定しているレベルは適切か"
					reviewKeyName="reviewPoint4"
				/>
				<br/>
				<EvaluationRadioButtons
					updateState={this.updateState}
					title="内容の充実度"
					reviewKeyName="reviewPoint5"
				/>
				<br/>
			  	<button type="button" name="submit" onClick={this.onSubmit}>送信</button>
		  	</form>
	  	)
  	}
}
