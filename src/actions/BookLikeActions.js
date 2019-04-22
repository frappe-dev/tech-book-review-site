import { ActionNameList } from '../ActionNameList';

export const postBookLikeRequested = (data, callback) => ({
	type: ActionNameList.postBookLikeRequested,
	payload: { data: data, callback: callback },
})

export const getBookLikeRequested = (data) => ({
	type: ActionNameList.getBookLikeRequested,
	payload: data,
})
