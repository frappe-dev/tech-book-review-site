import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

// component
import BookCard from '../components/BookCard';

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
        <tr>
        {
            latestBooks && "Items" in latestBooks && latestBooks.Items.map((item, index) =>
                <td>
                    <Link to={{
                        pathname: "/bookinfo/" + item.bookID,
                    }}>
                        <BookCard 
                            bookID = {item.bookID}
                            thumbnailURL = {item.bookInfo.thumbnailURL.S}
                            title = {item.bookInfo.title.S}
                            index = {index}
                        />
                    </Link>
                </td>                              
            )
        }
        </tr>   
    </table>
    );
}

LatestBookView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LatestBookView);