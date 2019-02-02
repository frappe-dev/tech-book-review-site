import { put, call, take, fork } from 'redux-saga/effects';
import { ActionNameList } from '../ActionNameList';
import axios from 'axios';

const GOOGLE_BOOK_API_ENDPOINT = "https://www.googleapis.com/books/v1/volumes";

function searchBook(keyword) {
    return axios.get(GOOGLE_BOOK_API_ENDPOINT, {
        params: {
            // ここにクエリパラメータを指定する
            q: keyword
        }
    }).then(res => {
        const result = res
        return { result } //返して代入する変数名と合わせる
    }).catch(err => {
            return { err }
    })
}

function* handleSearchBook() {
    while (true) {
        const action = yield take(ActionNameList.searchBookRequested);
        const { result, err } = yield call(searchBook, action.payload)
        if (!err) {
            yield put({type: ActionNameList.searchBookSucceeded, payload: JSON.stringify(result.data)});
        } else {
            console.log("err is happened");
            console.log(err);
            yield put({type: ActionNameList.searchBookError, payload: "エラーが起きました"});
        }
    }
}

export default function* rootSaga() {
    // takeEveryにするかは要検討
    yield fork(handleSearchBook);
}