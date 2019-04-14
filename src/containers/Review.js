import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';

import ReviewForm from '../components/ReviewForm'
import ErrorBoundary from '../components/ErrorBoundary';

class Review extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reviewPoint: ''
		};
		this.updateState = this.updateState.bind(this);
	}

	updateState(state) {
		this.setState(state);
	}

	render() {
		const { location } = this.props;
		if (location.state === void 0) {
			let bookId = this.props.match.params.id;
			return <Redirect to={'/bookinfo/:' + bookId} />;
		} else {
			return (
				<div>
					<h2>this is review page</h2>
					<h2>{location.state.title}</h2>
					<ErrorBoundary>
						<ReviewForm
							bookTitle={location.state.title}
							updateState={this.updateState}
							bookID={location.state.bookID}
							ISBN10={location.state.ISBN10}
							thumbnailURL={location.state.thumbnailURL}
							reviewPoint1Title="文章の読みやすさ"
							reviewPoint2Title="図や例の多さ"
							reviewPoint3Title="内容の正確さ"
							overAllPointsTitle="全体的な満足度"
							motivationFreeTextTitle="買った動機（任意）"
							motivationSuitableLevelTitle="動機に適していたか（任意）"
							recomendReaderLevelTitle="読んでほしい読者のレベル（任意）"
							freeWritingTitle="自由記述（任意）"
						/>
					</ErrorBoundary>
				</div>
			);
		}
	}
}

export default withRouter(Review);
