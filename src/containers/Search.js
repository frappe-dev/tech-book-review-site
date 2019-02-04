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

	    {/*cf. https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/Link.md */}
	    <Link to={{ 
		pathname: "/bookinfo/34",
		state: { name: "hoge" }
	    }}>
	    <Card key="1">
		<CardContent>
		<Typography variant="headline" component="h2">
		TEST
	        </Typography>	    
		</CardContent>
	    </Card>
		</Link>
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
