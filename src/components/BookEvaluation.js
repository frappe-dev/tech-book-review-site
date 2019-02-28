import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// とりあえずフロントで平均のレビュー点数を計算
function calculateAveragePoints(reviews) {
	let averageOverAllPoint = "";
	let sumOverAllPoint = 0
	for (let i = 0; i < reviews.length; i++) {
		sumOverAllPoint = sumOverAllPoint + Number(reviews[i].overallpoints)
    }
	if (reviews.length > 0) {
		averageOverAllPoint = sumOverAllPoint / reviews.length
	}
	return averageOverAllPoint
}

export default class BookEvaluation extends React.Component {
	render() {
		const { itemData } = this.props;
		let reviewCount = 0;
		let favoriteCount = 0;
		let overAllPoints = 0;
		let reviewCountText = "まだレビューがありません";
		let favoriteCountText = "まだお気に入りされていません";
		let overAllPointsText = "";

		// undefinedチェック
		if( itemData === void 0){
			console.log("itemData is undefined");
		} else {
			reviewCount = itemData.Count;
			favoriteCount = itemData.ScannedCount;
			if (reviewCount > 0) {
				reviewCountText = "レビュー数：" + reviewCount + "件"
				overAllPoints = calculateAveragePoints(itemData.Items);
				if (overAllPoints > 0) {
					overAllPointsText = "総合評価：" + overAllPoints + "/5"
				}
			}

			if (favoriteCount > 0) {
				favoriteCountText = "お気に入り：" + favoriteCount + "件"
			}
		}

		return(
			<CardContent>
				<Typography variant="h6" gutterBottom>
					{reviewCountText}
				</Typography>
				<Typography variant="h6" gutterBottom>
					{favoriteCountText}
				</Typography>
				<Typography variant="h6" gutterBottom>
					{overAllPointsText}
				</Typography>
			</CardContent>
		);
	}
}
