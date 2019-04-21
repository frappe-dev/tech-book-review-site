import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

// header
import AppHeader from '../components/AppHeader';

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

class ReviewSuccessFeedback extends Component {

    handleToMyPage = () => {
        this.props.history.push({
            pathname: '/mypage',
            state: { userID: "1234" }
        })
    }

    handleToHome = () => {
        this.props.history.push({
            pathname: '/'
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <AppHeader />

                <h3>レビューの投稿に成功しました！</h3>

                <h4>以下のボタンからマイページに移動して、履歴を確認することが出来ます。</h4>

                <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleToMyPage}>
                    マイページ
				</Button>

                <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleToHome}>
                    ホーム
				</Button>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(ReviewSuccessFeedback));
