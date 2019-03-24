import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

// XXX: BookCard.jsとの調整、検討が必要
function BookCard(props) {
	const title = JSON.stringify(props.item.volumeInfo.title);

	// XXX: jsonのif判定は見直したほうがいいかも
	let thumbnailURL = "https://jmva.or.jp/wp-content/uploads/2018/07/noimage.png";
	if ("volumeInfo" in props.item && props.item.volumeInfo.imageLinks !== void 0) {
		thumbnailURL = props.item.volumeInfo.imageLinks.thumbnail;
	}

	let bookID = "";
	if ("id" in props.item) {
		bookID = props.item.id;
	} else {
		//idがないものは表示しない(returnの仕方は暫定)
		return (
			<h3>no data</h3>
		);
	}

	//bookIDのreviewLikeInfoをパースする
	var bookReviewCount = 0;
	var bookLikeCount = 0;
	var overallPoints = 0;
	if (props.appInfoForBooks) {
		for (let data of props.appInfoForBooks) {
			if (!data.bookID) continue;
			if (!data.bookInfo) continue;
			if (bookID !== data.bookID) continue;
			if (data.bookInfo.bookreviewCount !== void 0) {
				bookReviewCount = data.bookInfo.bookreviewCount;
				console.log("bookInfo.Item: "+data.bookInfo.bookreviewCount);
			}
			if (data.bookInfo.booklikeCount !== void 0) {
				bookLikeCount = data.bookInfo.booklikeCount;
				console.log("bookInfo.Item: "+data.bookInfo.bookreviewCount);
			}
			if (data.bookInfo.overallpoints !== void 0) {
				overallPoints = data.bookInfo.overallpoints;
				console.log("bookInfo.Item: "+data.bookInfo.overallpoints);
			}
		}
	}

	// ISBN10があれば取得
	let ISBN10 = "";
	if ("industryIdentifiers" in props.item.volumeInfo) {
		if (props.item.volumeInfo.industryIdentifiers) {
			let industryIdentifiers = props.item.volumeInfo.industryIdentifiers;
			// industryIdentifiersの0 or 1 行目に入っているので、typeを見て取り出す
			industryIdentifiers.forEach(industryIdentifier => {
				if (industryIdentifier.type === "ISBN_10") {
					ISBN10 = industryIdentifier.identifier;
				}
			});
		}
	}

	let description = "情報なし";
	if (props.item.volumeInfo.description !== void 0) {
		description = props.item.volumeInfo.description;
	}

	const alt = "image" + props.index;
	// cf. https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/Link.md
	return (
		<Link to={{
			pathname: "/bookinfo/" + bookID,
			state: {
				bookID: bookID,
				title: title,
				thumbnailURL: thumbnailURL,
				description: description,
				ISBN10: ISBN10,
			}
		}}>
			<Card key={props.index}>
				<CardContent>
					<Typography variant="headline" component="h2">
						検索結果 {props.index}
					</Typography>
					<Typography component="p">
						タイトル: {title}
					</Typography>
					<Typography>
						総合評価: {overallPoints}
						レビュー数: {bookReviewCount}
						気になる数: {bookLikeCount}
					</Typography>
					<Typography>
						<img src={thumbnailURL} alt={alt} className="thumbnail" />
					</Typography>
				</CardContent>
			</Card>
		</Link>
	)
}

export default class SearchedBookCards extends React.Component {
	render() {
		const { itemData, appInfoForBooks } = this.props;
		return (
			<div>
				{
					itemData && itemData.map((item, index) =>
						<BookCard item={item} index={index} key={index} appInfoForBooks={appInfoForBooks}/>
					)
				}
			</div>
		);
	}
}
