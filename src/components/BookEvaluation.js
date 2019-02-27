import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// とりあえずフロントで平均のレビュー点数を計算
function calculateAveragePoints(props) {
	let averagePoints = "";
	let sumPoints = 0
	for (let i = 0; i < props.length; i++) {
		sumPoints = sumPoints + Number(props[i].overallpoints)
    }
	averagePoints = sumPoints / props.length
	return averagePoints
}

export default class BookEvaluation extends React.Component {
	render() {
		const { itemData } = this.props;
		let reviewCount = "";
		let favoriteCount = "";
		let overAllPoints = "";
		// undefinedチェック
		if( itemData === void 0){
			console.log("itemData is undefined");
		}else{
			reviewCount = itemData.Count
			favoriteCount = itemData.ScannedCount
			overAllPoints = calculateAveragePoints(itemData.Items)
		}
		return(
			<CardContent>
				<Typography variant="h6" gutterBottom>
					レビュー数: {reviewCount}
				</Typography>
				<Typography variant="h6" gutterBottom>
					お気に入り数: {favoriteCount}
				</Typography>
				<Typography variant="h6" gutterBottom>
					総合評価: {overAllPoints}
				</Typography>
			</CardContent>
		);
	}
}
