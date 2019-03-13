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

function EvaluationContent(evaluation) {
    let content = "入力なし";
    if (evaluation.content !== null) {
        content = evaluation.content;
    }

    return (
        <Typography component="p">
            {evaluation.title} : {content}
        </Typography>
    )
}

function BookReviewCard(props) {
    const { classes, updateTime, overAllPoints, evaluation, index } = props;
    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="headline" component="h2">
                    {index + 1}件目のレビュー
                </Typography>
                <Typography component="p">
                    投稿日：{updateTime.substring(0, 10)}
                </Typography>
                <Typography component="p">
                    総合評価：{overAllPoints}
                </Typography>
                {evaluation.map((item, index) =>
                    <EvaluationContent
                        key={index}
                        title={item.key}
                        content={item.value} />
                )}
            </CardContent>
        </Card>
    );
}

BookReviewCard.propTypes = {
    classes: PropTypes.object.isRequired,
    evaluation: PropTypes.array.isRequired,
};

export default withStyles(styles)(BookReviewCard);