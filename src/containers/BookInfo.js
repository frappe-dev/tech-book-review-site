import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import SearchForm from '../components/SearchForm';
import SearchedBookCards from '../components/SearchedBookCards';

import { searchBookRequested } from '../actions/SearchActions';


import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class BookInfo extends Component {
    constructor(props) {
	    super(props);
	    this.state = {
	        hoge: "",
	    };
    }

    submit(values) {
	this.props.onSubmit(values.keyword);
    }

    render() {
	const { location } = this.props;
	console.log(location);
	console.log(location.state);

        return (
            <div>
                <h2>this is bookinfo page</h2>
		{location.query}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    hoge: state.bookList.data
});


const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit(keyword) {
            dispatch(searchBookRequested(keyword));
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookInfo));
