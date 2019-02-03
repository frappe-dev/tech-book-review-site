import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import SearchForm from '../components/SearchForm';
import SearchedBookCards from '../components/SearchedBookCards';

import { searchBookRequested } from '../actions/SearchActions';


class Search extends Component {
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
        return (
            <div>
                <h2>this is search page</h2>

                <span>
                    <SearchForm onSubmit={this.submit.bind(this)}/>
                </span>

                <SearchedBookCards itemData={this.props.hoge}/>
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

/*
const と functionの使い方が理解できていない。(どちらでも動く)
function mapDispatchToProps(dispatch) {
    return {
	onSubmit(keyword) {
	    dispatch(getBookList(keyword));
	}
    };
}  
*/

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
