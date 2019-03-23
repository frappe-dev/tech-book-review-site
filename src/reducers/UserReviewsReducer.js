import { ActionNameList } from '../ActionNameList';
const initialState = [];

export default function UserReviewsReducer(state = initialState, action) {
    switch (action.type) {
        case ActionNameList.getUserReviewsSucceeded:
            return {
                ...state,
                data: action.payload,
            }
        case ActionNameList.getUserReviewsError:
            return {
                ...state,
                error: action.isError,
            }
        default:
            return state;
    }
}
