import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

class AmazonLinkButton extends Component {

    renderAmazonLinkButton(amazonLink, classes) {
        if (this.props.amazonLink === "") {
            return (
                <Link to={{
                    pathname: "/noamazonlink",
                    state: {
                        bookTitle: this.props.title,
                    }
                }}>
                    <Button variant="contained" className={classes.button}>
                        Amazonリンク
					</Button>
                </Link>
            );
        } else {
            return (
                <a href={this.props.amazonLink} target="_blank" rel="noreferrer noopener">
                    <Button variant="contained" className={classes.button}>
                        Amazonリンク
					</Button>
                </a>
            );
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.renderAmazonLinkButton(this.props.amazonLink, classes)}
            </div>
        );
    }
}

export default withStyles(styles)(AmazonLinkButton);
