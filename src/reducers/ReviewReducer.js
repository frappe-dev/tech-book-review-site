import { ActionNameList } from '../ActionNameList';
const initialState = [];

export default function ReviewReducer(state = initialState, action) {
    switch (action.type) {
        case ActionNameList.getReviewSucceeded:
            return {
                ...state, 
                data: action.payload,
            }        
        case ActionNameList.getReviewError:
            return {
                ...state,
                error: action.isError,
            }
        default:
            return state;
    }
}
