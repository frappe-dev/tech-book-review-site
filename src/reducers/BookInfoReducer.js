import { ActionNameList } from '../ActionNameList';
const initialState = [];

export default function BookInfoReducer(state = initialState, action) {
    switch (action.type) {
        case ActionNameList.getLatestBooksSucceeded:
            return {
                ...state, 
                data: action.payload,
            }        
        case ActionNameList.getLatestBooksError:
            return {
                ...state,
                error: action.isError,
            }
        default:
            return state;
    }
}
