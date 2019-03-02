import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ReviewBookList from '../components/ReviewBookList'
import FavoriteBookList from '../components/FavoriteBookList'

// header
import AppHeader from '../components/AppHeader';

// タブの中身
function TabContainer({ children, dir }) {
	return (
		children
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
	dir: PropTypes.string.isRequired,
};

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
});

class Record extends React.Component {
	state = {
		value: 0,
	};

	handleChange = (event, value) => {
		this.setState({ value });
	};

	handleChangeIndex = index => {
		this.setState({ value: index });
	};

	render() {
		const { classes, theme } = this.props;

		return (
			<div className={classes.root}>
				<AppHeader/>
				<AppBar position="static" color="default">
					<Tabs
						value={this.state.value}
						onChange={this.handleChange}
						indicatorColor="primary"
						textColor="primary"
						variant="fullWidth"
					>
						<Tab label="お気に入り一覧" />
						<Tab label="レビュー一覧" />
					</Tabs>
				</AppBar>
				<SwipeableViews
					axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
					index={this.state.value}
					onChangeIndex={this.handleChangeIndex}
				>
					<TabContainer dir={theme.direction}>
						<ReviewBookList/>
					</TabContainer>
					<TabContainer dir={theme.direction}>
						<FavoriteBookList/>
					</TabContainer>
				</SwipeableViews>
			</div>
		);
	}
}

Record.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Record);
