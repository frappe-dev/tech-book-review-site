import React from 'react';
import BookReviewCard from '../components/BookReviewCard'

export default class BookReviewList extends React.Component {
    render() {
        const { reviews } = this.props;
        let items;
        if (reviews === void 0) {
            console.log("itemData is undefined");
        } else {
            items = reviews.Items;
        }
        return (
            <div>
                {!(reviews === void 0) && items.map((review, index) =>
                    <BookReviewCard
                        updateTime={review.updateTIME}
                        evaluation={review.evaluation}
                        overAllPoints={review.overallpoints}
                        index={index}
                    />)
                }
            </div>
        );
    }
}
