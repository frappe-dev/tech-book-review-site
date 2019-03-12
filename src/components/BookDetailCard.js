import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        maxWidth: 400,
        margin: "auto",
    }
};

function BookDetailCard(props) {
    const { classes, imageSource, title, description } = props;
    return (
        <Card className={classes.card}>
            <img src={imageSource} alt="bookImage" className={classes.media} />
            <CardContent>
                <Typography gutterBottom variant="title" component="title">
                    {title}
                </Typography>
                <Typography gutterBottom variant="h6" component="h4" color="primary">
                    概要
                </Typography>
                <Typography component="p">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}

BookDetailCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BookDetailCard);