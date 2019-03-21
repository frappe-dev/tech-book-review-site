import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        width : 400,
        height: 500,
        margin: "auto",
    },
    media: {
        width : 380,
        height: 400
    }
};

function BookCard(props) {
    const { classes, thumbnailURL, title, index } = props;
    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="headline" component="h6">
                    {index + 1}冊目の本
                </Typography>
                <Typography variant="headline" component="h6">
                    タイトル: {title}
                </Typography>

            </CardContent>
            <CardMedia
                className={classes.media}
                image={thumbnailURL}
                title="bookThumbnail"
            />
        </Card>
    );
}

BookCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BookCard);