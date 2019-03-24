import { ActionNameList } from '../ActionNameList';

export const searchBookRequested = (data) => ({
	type: ActionNameList.searchBookRequested,
	payload: data,
})

export const getBookInfoByBookidRequested = (data) => ({
	type: ActionNameList.getBookInfoByBookidRequested,
	payload: data,
})

export const getReviewLikeByBookidsRequested = (data) => ({
	type: ActionNameList.getReviewLikeByBookidsRequested,
	payload: data,
})