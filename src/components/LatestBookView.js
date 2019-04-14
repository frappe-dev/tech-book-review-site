import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

// component
import BookCard from '../components/BookCard';
import ErrorBoundary from '../components/ErrorBoundary';


const styles = {
    bookTable: {
        maxWidth: 800,
        margin: "auto",
    }
};

function LatestBookView(props) {
    const { latestBooks } = props;
    console.log(latestBooks)
    const interbal = 100;
    return (
        <Slider autoplay={interbal}>
            {
                latestBooks && "Items" in latestBooks && latestBooks.Items.map((item, index) =>
                    <div key={index}>
                        <ErrorBoundary>
                            <Link to={{
                                pathname: "/bookinfo/" + item.bookID,
                            }}>

                                <BookCard
                                    bookID={item.bookID}
                                    thumbnailURL={item.bookInfo.thumbnailURL.S ? item.bookInfo.thumbnailURL.S : "https://jmva.or.jp/wp-content/uploads/2018/07/noimage.png"}
                                    title={item.bookInfo.title.S}
                                    index={index}
                                />
                            </Link>
                        </ErrorBoundary>
                    </div>
                )
            }
        </Slider>
    );
}

LatestBookView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LatestBookView);