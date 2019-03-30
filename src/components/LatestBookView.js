import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

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
    const { classes, latestBooks } = props;
    return (

    <table border="1" className={classes.bookTable}>
        <tbody>
        <tr>
        {
            latestBooks && "Items" in latestBooks && latestBooks.Items.map((item, index) =>
                <td key={index}>
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
                </td>                              
            )
        }
        </tr>
        </tbody>   
    </table>
    );
}

LatestBookView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LatestBookView);