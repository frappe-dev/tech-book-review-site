import { ActionNameList } from '../ActionNameList';
const initialState = [];

export default function BookInfoByBookidReducer(state = initialState, action) {
    switch (action.type) {
        case ActionNameList.getBookInfoByBookidSucceeded:
            return {
                ...state,
                data: action.payload,
            }
        case ActionNameList.getBookInfoByBookidError:
            return {
                ...state,
                error: action.isError,
            }
        default:
            return state;
    }
}
