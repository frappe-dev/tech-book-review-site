import { ActionNameList } from '../ActionNameList';

export const postReviewRequested = (data, callback) => ({
	type: ActionNameList.postReviewRequested,
	payload: { data: data, callback: callback },
})

export const getReviewRequested = (data) => ({
	type: ActionNameList.getReviewRequested,
	payload: data,
})
