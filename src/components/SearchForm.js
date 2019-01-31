import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import { getBookList } from '../actions/SearchActions';

function submit(value, dispatch) {
    dispatch(getBookList(value));
}

const SearchForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <Field 
                name="code"
                component="input"
                label="コード"
            />

            <Button
                type="submit"
                disabled={submitting}>
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