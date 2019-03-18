import { put, call, take, fork } from 'redux-saga/effects';
import { ActionNameList } from '../ActionNameList';
import axios from 'axios';

const GOOGLE_BOOK_API_ENDPOINT = "https://www.googleapis.com/books/v1/volumes";
const BOOKREVIEW_API_ENDPOINT = "https://nd40yngtt7.execute-api.ap-northeast-1.amazonaws.com/dev/"; //　ソースコードで持たないほうがいい??

function getLatestBooks() {
    return axios.get(BOOKREVIEW_API_ENDPOINT + "book?mode=getLatestBooks")
        .then(res => {
            const result = res;
            return { result }
        }).catch(err => {
            return { err }
        })
}

function postBookLike(params) {
    return axios.post(BOOKREVIEW_API_ENDPOINT + "booklike", JSON.stringify(params)
    ).then(res => {
        const result = res;
        return { result }
    }).catch(err => {
        return { err }
    })
}

function getReview(keyword) {
    const bookID = keyword;
    //const bookID = ['kato','sato','suzuki','tanaka','hayama'];
    //配列で渡せば、","区切りの文字列で渡る
    return axios.get(BOOKREVIEW_API_ENDPOINT + "bookreview?bookID=" + bookID)
        // 下の方法だとCORSでエラーになる. 理解不足
        //headers: {
        //  'Access-Control-Allow-Origin': '*',
        //},
        //params: {
        //  bookID: bookID
        //}
        .then(res => {
            const result = res;
            return { result }
        }).catch(err => {
            return { err }
        })
}

function postReview(params) {
    //XXX: parse params from body
    return axios.post(BOOKREVIEW_API_ENDPOINT + "bookreview", JSON.stringify(params)
    ).then(res => {
        const result = res;
        return { result }
    }).catch(err => {
        return { err }
    })
}

function searchBook(keyword) {
    return axios.get(GOOGLE_BOOK_API_ENDPOINT, {
        params: {
            q: keyword
        }
    }).then(res => {
        //XXX: jsonの加工をする
        const result = res;
        return { result } //返して代入する変数名と合わせる
    }).catch(err => {
        return { err }
    })
}

function* handleGETLatestBooks() {
    while (true) {
        const action = yield take(ActionNameList.getLatestBooksRequested);
        const { result, err } = yield call(getLatestBooks, action.payload);
        if (!err) {
            console.log("succeed!!!");
            yield put({ type: ActionNameList.getLatestBooksSucceeded, payload: result.data });
        } else {
            console.log("err is happened");
            console.log(err);
            yield put({ type: ActionNameList.getLatestBooksError, isError: true });
        }
    }
}

function* handlePostBookLike() {
    while (true) {
        const action = yield take(ActionNameList.postBookLikeRequested);
        const { result, err } = yield call(postBookLike, action.payload);
        if (!err) {
            console.log("succeed!!!");
            yield put({ type: ActionNameList.postBookLikeSucceeded, payload: result });
        } else {
            console.log("err is happened");
            console.log(err);
            yield put({ type: ActionNameList.postBookLikeError, isError: true });
        }
    }
}

function* handleGetReview() {
    while (true) {
        const action = yield take(ActionNameList.getReviewRequested);
        const { result, err } = yield call(getReview, action.payload);
        if (!err) {
            console.log("succeed!!!");
            console.log(result.data);
            yield put({ type: ActionNameList.getReviewSucceeded, payload: result.data });
        } else {
            console.log("err is happened");
            console.log(err);
            yield put({ type: ActionNameList.getReviewError, isError: true });
        }
    }
}

function* handlePostReview() {
    while (true) {
        const action = yield take(ActionNameList.postReviewRequested);
        const { result, err } = yield call(postReview, action.payload);
        if (!err) {
            console.log("succeed");
            console.log(result);
            yield put({ type: ActionNameList.postReviewSucceeded, payload: result });
        } else {
            console.log("err is happened");
            console.log(err);
            yield put({ type: ActionNameList.postReviewError, isError: true });
        }
    }
}

function* handleSearchBook() {
    while (true) {
        const action = yield take(ActionNameList.searchBookRequested);
        const { result, err } = yield call(searchBook, action.payload);
        if (!err) {
            yield put({ type: ActionNameList.searchBookSucceeded, payload: result.data.items });
        } else {
            console.log("err is happened");
            console.log(err);
            yield put({ type: ActionNameList.searchBookError, isError: true });
        }
    }
}

function* handleGetSpecificBook() {
    while (true) {
        const action = yield take(ActionNameList.getSpecificBookRequested);
        const { result, err } = yield call(searchBook, action.payload);
        if (!err) {
            // BookIDを使って検索するので[0]を取り出し
            yield put({ type: ActionNameList.getSpecificBooksSucceeded, payload: result.data.items[0] });
        } else {
            console.log("err is happened");
            console.log(err);
            yield put({ type: ActionNameList.getSpecificBooksError, isError: true });
        }
    }
}

export default function* rootSaga() {
    // takeEveryにするかは要検討
    yield fork(handleSearchBook);
    yield fork(handlePostReview);
    yield fork(handleGetReview);
    yield fork(handlePostBookLike);
    yield fork(handleGETLatestBooks);
    yield fork(handleGetSpecificBook);
}
