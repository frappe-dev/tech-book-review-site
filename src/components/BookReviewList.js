import React from 'react';
import BookReviewCard from '../components/BookReviewCard'
import ErrorBoundary from '../components/ErrorBoundary';

export default class BookReviewList extends React.Component {
    render() {
        const { reviews } = this.props;
        let items;
        if (reviews === void 0) {
            console.log("itemData is undefined");
        } else {
            items = reviews.Items;
        }
        console.log(items);
        return (
            <div>
                {!(reviews === void 0) && items.map((review, index) =>
                    <ErrorBoundary>
                        <BookReviewCard
                            key={index}
                            updateTime={review.updateTIME}
                            evaluation={review.evaluation}
                            overAllPoints={review.overallpoints}
                            index={index}
                        />
                    </ErrorBoundary>
                    )
                }
            </div>
        );
    }
}
