import { ActionNameList } from '../ActionNameList';

export const getLatestBooksRequested = (data) => ({
	type: ActionNameList.getLatestBooksRequested,
	payload: data,
})