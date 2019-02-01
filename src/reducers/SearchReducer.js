import { ActionNameList } from '../ActionNameList';
const initialState = [];

export default function SearchReducer(state = initialState, action) {
    switch (action.type) {
    case ActionNameList.getBookList:
//	return [...state, action.text];
	return action.text;
    default:
	return state;
    }
}
