import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';

import { Auth } from 'aws-amplify';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    accountButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};
  
class AppHeader extends React.Component {
    state = {
        isAuthenticated: true,
    };

    async componentDidMount() {
        console.log("[componentDidMount of AppHeader is called]");
        await Auth.currentAuthenticatedUser()
            .then(data => 
                console.log(data)
            )
            .catch(err => console.log(err))
    }

    handleToLogin = () => {
        this.props.history.push('/')
    }

    render() {
        const { classes } = this.props;
        const { isAuthenticated } = this.state;
    
        return (
          <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        Technical Book Review Site
                    </Typography>

                        {/* ログイン状態に応じて表示 */}
                        {(() => {
                            if (isAuthenticated) {
                                return (
                                    <Button color="inherit" onClick={this.handleToLogin}>Login</Button>
                                )
                            } else {
                                return (
                                    <IconButton className={classes.accountButton} color="inherit" aria-label="Account">
                                        <AccountCircle />
                                    </IconButton>
                                )
                            }
                        })()}
                </Toolbar>
            </AppBar>
          </div>
        );
    }
}

AppHeader.propTypes = {
    classes: PropTypes.object.isRequired,
};
   
export default withRouter(withStyles(styles)(AppHeader)); 