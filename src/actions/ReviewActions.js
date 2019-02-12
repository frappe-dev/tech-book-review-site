import { ActionNameList } from '../ActionNameList';

export const postReviewRequested = (data) => ({
    type: ActionNameList.postReviewRequested,
    payload: data,
})

export const getReviewRequested = (data) => ({
    type: ActionNameList.getReviewRequested,
    payload: data,
})