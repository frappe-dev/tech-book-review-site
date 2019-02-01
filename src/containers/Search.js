import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import SearchForm from '../components/SearchForm';
import { getBookList } from '../actions/SearchActions';

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
                <h2>this is search</h2>

                <span>
                    <SearchForm onSubmit={this.submit.bind(this)}/>
                </span>
		        <h4>{this.props.hoge}</h4>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    hoge: state.bookList
});


const mapDispatchToProps = (dispatch) => {
    return {
	onSubmit(keyword) {
	    dispatch(getBookList(keyword));
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
