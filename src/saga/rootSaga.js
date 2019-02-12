import { put, call, take, fork } from 'redux-saga/effects';
import { ActionNameList } from '../ActionNameList';
import axios from 'axios';

const GOOGLE_BOOK_API_ENDPOINT = "https://www.googleapis.com/books/v1/volumes";
const BOOKREVIEW_API_ENDPOINT  = "https://nd40yngtt7.execute-api.ap-northeast-1.amazonaws.com/dev/bookreview"; //　ソースコードで持たないほうがいい??

function getReview(body) {
    //XXX: body -> bookID
    const bookID = "BOOK1";
    return axios.get(BOOKREVIEW_API_ENDPOINT+"bookreview", {
	params: {
	    bookID = bookID
	}
    }).then(res => {
	const result = res;
	return { result }
    }).catch(err => {
	return { err }
    })
	    
}

function postReview(body) {
    //XXX: parse params from body
    return axios.post(BOOKREVIEW_API_ENDPOINT+"bookreview", {
        bookID: "AAA",
        userID: "AAA",
        overallpoints: "4",
        evaluation: {
           param1: "3",
           param2: "4",
           param3: "3"
        },
        ISBN: "BBB"
    }).then(res => {
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
            console.log("succeed");
            //yield put({type: ActionNameList.getReviewSucceeded, payload: result.data.items});
        } else {
            console.log("err is happened");
            console.log(err);
            yield put({type: ActionNameList.getReviewError, isError: true});
        }
    }
}

function* handlePostReview() {
    while (true) {
        const action = yield take(ActionNameList.reviewBookRequested);
        const { result, err } = yield call(postReview, action.payload);
        if (!err) {
            console.log("succeed");
            //yield put({type: ActionNameList.postReviewSucceeded, payload: result.data.items});
        } else {
            console.log("err is happened");
            console.log(err);
            yield put({type: ActionNameList.postReviewError, isError: true});
        }
    }
}

function* handleSearchBook() {
    while (true) {
        const action = yield take(ActionNameList.searchBookRequested);
        const { result, err } = yield call(searchBook, action.payload);
        if (!err) {
            yield put({type: ActionNameList.searchBookSucceeded, payload: result.data.items});
        } else {
            console.log("err is happened");
            console.log(err);
            yield put({type: ActionNameList.searchBookError, isError: true});
        }
    }
}

export default function* rootSaga() {
    // takeEveryにするかは要検討
    yield fork(handleSearchBook);
    yield fork(handlePostReview);
    yield fork(handleGetReview);
}
