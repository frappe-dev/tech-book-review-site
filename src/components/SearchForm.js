import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import { getBookList } from '../actions/SearchActions';

const SearchForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <Field 
                name="keyword"
                component="input"
                label="search-keyword"
            />

            <Button
                type="submit"
                disabled={submitting || pristine}>
                検索
            </Button>
            <Button
                type="button"
                onClick={reset}
                disabled={submitting || pristine}>
                クリア
            </Button>
        </form>
        );
};

export default reduxForm({
    form: 'search-form',
    onSubmit(values, dispatch) {
        dispatch(getBookList(values));
    },
})(SearchForm);
