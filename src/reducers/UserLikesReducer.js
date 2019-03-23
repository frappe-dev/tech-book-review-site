import { ActionNameList } from '../ActionNameList';
const initialState = [];

export default function UserLikesReducer(state = initialState, action) {
    switch (action.type) {
        case ActionNameList.getUserLikesSucceeded:
            return {
                ...state,
                data: action.payload,
            }
        case ActionNameList.getUserLikesError:
            return {
                ...state,
                error: action.isError,
            }
        default:
            return state;
    }
}
