import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import PeopleIcon from '@material-ui/icons/People';
import FaceIcon from '@material-ui/icons/Face';
import HomeIcon from '@material-ui/icons/Home';
import EmailIcon from '@material-ui/icons/Email';


// 参考
// https://material-ui.com/demos/drawers/

const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
};

class DrawerSideMenu extends Component {
    state = {
        left: false,
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    handleToHome = () => {
        this.props.history.push('/')
    }

    handleToSearchPage = () => {
        this.props.history.push('/search')
    }

    handleToMypage = () => {
        this.props.history.push('mypage')
    }

    handleToContactPage = () => {
        this.props.history.push('contact')
    }

    handleToAboutUsPage = () => {
        this.props.history.push('contact')
    }

    render() {
        const { classes } = this.props;

        const sideList = (
            <div className={classes.list}>
                <List>
                    <ListItem button key='product' onClick={this.handleToSearchPage}>
                        <ListItemIcon><SearchIcon /></ListItemIcon>
                        <ListItemText primary='書籍検索' />
                    </ListItem>

                    <ListItem button key='blog' onClick={this.handleToMypage}>
                        <ListItemIcon><FaceIcon /></ListItemIcon>
                        <ListItemText primary='マイページ' />
                    </ListItem>

                    <ListItem button key='contact' onClick={this.handleToContactPage}>
                        <ListItemIcon><EmailIcon /></ListItemIcon>
                        <ListItemText primary='お問い合わせ' />
                    </ListItem>

                    <ListItem button key='aboutUs' onClick={this.handleToAboutUsPage}>
                        <ListItemIcon><PeopleIcon /></ListItemIcon>
                        <ListItemText primary='About Us' />
                    </ListItem>


                </List>
                <Divider />
                <List>
                    <ListItem button key='home' onClick={this.handleToHome}>
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary='ホーム' />
                    </ListItem>
                </List>
            </div>
        );

        return (
            <div>
                <MenuIcon onClick={this.toggleDrawer('left', true)} />
                <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('left', false)}
                        onKeyDown={this.toggleDrawer('left', false)}
                    >
                        {sideList}
                    </div>
                </Drawer>
            </div>
        );
    }
}

DrawerSideMenu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(DrawerSideMenu));