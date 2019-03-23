import { ActionNameList } from '../ActionNameList';

export const getUserReviews = (data) => ({
    type: ActionNameList.getUserReviewsRequested,
    payload: data,
})

export const getUserLikes = (data) => ({
    type: ActionNameList.getUserLikesRequested,
    payload: data,
})