import { ActionNameList } from '../ActionNameList';

export const postBookLikeRequested = (data) => ({
	type: ActionNameList.postBookLikeRequested,
	payload: data,
})

export const getBookLikeRequested = (data) => ({
	type: ActionNameList.getBookLikeRequested,
	payload: data,
})
