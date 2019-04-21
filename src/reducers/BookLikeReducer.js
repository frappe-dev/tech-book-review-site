import { ActionNameList } from '../ActionNameList';
const initialState = [];

export default function BookLikeReducer(state = initialState, action) {
    switch (action.type) {
        case ActionNameList.postBookLikeRequested:
            return {
                ...state,
                data: action.payload,
                retCode: 0,
            }        
        case ActionNameList.postBookLikeSucceeded:
            return {
                ...state,
                data: action.payload,
                retCode: 200,
            }        
        default:
            return state;
    }
}
