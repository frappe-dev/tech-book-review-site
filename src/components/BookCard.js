import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        maxWidth: 500,
        margin: "auto",
        marginTop: 20,
        marginBottom: 20,
    },
    media: {
        marginBottom:20,
    }
};

function BookCard(props) {
    const { classes, thumbnailURL, title, index } = props;
    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="subtitle1">
                    {index + 1}冊目の本
                </Typography>
                <Typography variant="h6">
                    {title}
                </Typography>

            </CardContent>
            <img src={thumbnailURL} alt="bookImage" className={classes.media} />
        </Card>
    );
}

BookCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BookCard);