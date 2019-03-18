import { ActionNameList } from '../ActionNameList';

export const searchBookRequested = (data) => ({
	type: ActionNameList.searchBookRequested,
	payload: data,
})

export const getSpecificBookRequested = (data) => ({
	type: ActionNameList.getSpecificBookRequested,
	payload: data,
})