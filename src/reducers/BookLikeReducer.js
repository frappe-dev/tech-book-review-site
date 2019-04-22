import { ActionNameList } from '../ActionNameList';
const initialState = [];

export default function BookLikeReducer(state = initialState, action) {
    switch (action.type) {
        case ActionNameList.postBookLikeSucceeded:
            return {
                ...state,
                data: action.payload,
                isDone: true,
            }        
        default:
            return state;
    }
}
