import { ActionNameList } from '../ActionNameList';

export const searchBookRequested = (data) => ({
    type: ActionNameList.searchBookRequested,
    payload: data,
})