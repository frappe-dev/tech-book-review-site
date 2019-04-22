import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';

//DrawerSideMenu
import DrawerSideMenu from './DrawerSideMenu';

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
        isAuthenticated: false,
    };

    async componentDidMount() {
        console.log("[componentDidMount of AppHeader is called]");
        await Auth.currentAuthenticatedUser()
            .then(data => {
                this.setState({isAuthenticated: true});
                console.log(data);
            }).catch(err => {
                this.setState({isAuthenticated: false});
                console.log(err);
            })
    }

    handleToLogin = () => {
        this.props.history.push('/login');
    }

    handleToMypage = () => {
        this.props.history.push('/mypage');
    }

    render() {
        const { classes } = this.props;
        const { isAuthenticated } = this.state;
    
        return (
          <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <DrawerSideMenu /> 
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                            <Link to={`/`}>Compile Books</Link>
                    </Typography>

                        {/* ログイン状態に応じて表示 */}
                        {(() => {
                            if (!isAuthenticated) {
                                return (
                                    <Button color="inherit" onClick={this.handleToLogin}>Login</Button>
                                )
                            } else {
                                return (
                                    <Button color="inherit" onClick={this.handleToMypage}><AccountCircle/></Button>
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