import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';


//List
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const styles = theme => ({
	root: {
		width: '100%',
		maxWidth: 480,
		backgroundColor: theme.palette.background.paper,
	},
	nested: {
		paddingLeft: theme.spacing.unit * 4,
	},
});


class Category extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expanded: false,
		}
		this.handleExpandClick = this.handleExpandClick.bind(this);
	};

	handleExpandClick = () => {
		this.setState({ expanded: !this.state.expanded });
	};

	// TODO1: jsonのカテゴリ定義を読み取って、動的に作るとかに...
	// TODO2: カテゴリの開閉に自由度をもたせる
	//        image https://daviferreira.github.io/react-sanfona/
	render() {
		const { classes } = this.props;
		return (
			<div>
				<h2>this is category page</h2>

				<List
					component="nav"
					subheader={<ListSubheader component="div">Category of Books</ListSubheader>}
					className={classes.root}
					>
					<ListItem button>
						<ListItemText inset primary="開発プロセス" />
					</ListItem>

					<ListItem button onClick={this.handleExpandClick}>
						<ListItemText inset primary="クラウド" />
						{this.state.expanded ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<ListItem button className={classes.nested}>
								<ListItemText inset primary="AWS(TODO: click->一覧, 書籍数表示" />
							</ListItem>
						</List>

						<List component="div" disablePadding>
							<ListItem button className={classes.nested}>
								<ListItemText inset primary="GCP" />
							</ListItem>
						</List>
					</Collapse>
				</List>

			</div>
		);
	}
}

Category.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Category));
