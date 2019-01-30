import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import { getBookList } from '../actions/SearchActions';

class Search extends Component {
    constructor(props) {
	    super(props);
	    this.state = {
	        hoge: "",
	    };
    }

    render() {
        return (
            <div>
                <h2>this is search</h2>
		        <Button variant="contained" color="primary" onClick={this.props.getBooks}>
		            test
	            </Button>

		        <h4>{this.props.hoge}</h4>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    hoge: state.bookList
});


const mapDispatchToProps = dispatch => ({
    getBooks() {
	    dispatch(getBookList('test'));
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
