import { ActionNameList } from '../ActionNameList';

export const getBookList = (data) => ({
    type: ActionNameList.getBookList,
    text: data,
})
