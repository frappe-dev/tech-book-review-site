import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	margin: {
		margin: theme.spacing.unit,
	},
	input: {
		display: 'none',
	},
});

class Home extends Component {
	handleToSearchPage = () => {
		this.props.history.push('/search')
	}

	handleToCategoryPage = () => {
		this.props.history.push('/category')
	}

	handleToMyPage = () => {
		this.props.history.push({
			pathname: '/mypage',
    		state: { userID: "1234" }
 		})
	}

	handleToLogin = () => {
		this.props.history.push('/login')
	}

	render() {
		const { classes } = this.props;
		return (
			<div>
				this is home

				<h3>検索ページへのリンク</h3>

				<h3>カテゴリ分類ページへのリンク</h3>

				<h3>最新レビュー10件の表示</h3>

				<h3>マイページへのリンク</h3>

				<Button variant="contained" color="primary" className={classes.button} onClick={this.handleToSearchPage}>
					書籍を検索
				</Button>

				<Button variant="contained" color="secondary" className={classes.button} onClick={this.handleToCategoryPage}>
					カテゴリ一覧
				</Button>

				<Button variant="contained" color="secondary" className={classes.button} onClick={this.handleToMyPage}>
					マイページ
				</Button>

				<Button variant="contained" color="secondary" className={classes.button} onClick={this.handleToLogin}>
					認証(テスト用)
				</Button>
			</div>
		);
	}
}

export default withRouter(withStyles(styles)(Home));
