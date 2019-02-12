import { ActionNameList } from '../ActionNameList';

export const postReviewRequested = (data) => ({
    type: ActionNameList.postReviewRequested,
    payload: data,
})