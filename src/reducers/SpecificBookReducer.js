import { ActionNameList } from '../ActionNameList';
const initialState = [];

export default function SpecificBookReducer(state = initialState, action) {
    switch (action.type) {
        case ActionNameList.getSpecificBooksSucceeded:
            return {
                ...state,
                data: action.payload,
            }
        case ActionNameList.getSpecificBooksError:
            return {
                ...state,
                error: action.isError,
            }
        default:
            return state;
    }
}
