import { ActionNameList } from '../ActionNameList';

export const getBookList = (data) => ({
    type: ActionNameList.getBookList,
    payload: data,
})

export const searchBookRequested = (data) => ({
    type: ActionNameList.searchBookRequested,
    payload: data,
})