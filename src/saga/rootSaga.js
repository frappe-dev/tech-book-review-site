import { put, call, take, fork } from 'redux-saga/effects';
import { ActionNameList } from '../ActionNameList';
import axios from 'axios';

const GOOGLE_BOOK_API_ENDPOINT = "https://www.googleapis.com/books/v1/volumes";
const BOOKREVIEW_API_ENDPOINT = "https://nd40yngtt7.execute-api.ap-northeast-1.amazonaws.com/dev/"; //　ソースコードで持たないほうがいい??

function getReview(keyword) {
    const bookID = keyword;
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
    console.log(params)
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
            //yield put({type: ActionNameList.postReviewSucceeded, payload: result.data.items});
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
            console.log(result.data);
            yield put({ type: ActionNameList.searchBookSucceeded, payload: result.data.items });
        } else {
            console.log("err is happened");
            console.log(err);
            yield put({ type: ActionNameList.searchBookError, isError: true });
        }
    }
}

export default function* rootSaga() {
    // takeEveryにするかは要検討
    yield fork(handleSearchBook);
    yield fork(handlePostReview);
    yield fork(handleGetReview);
}
