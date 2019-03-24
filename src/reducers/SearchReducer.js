import { ActionNameList } from '../ActionNameList';
const initialState = [];

export default function SearchReducer(state = initialState, action) {
    switch (action.type) {
        case ActionNameList.searchBookSucceeded:
            return {
                ...state, 
                searchedBooksInfo: action.payload,
            }        
        case ActionNameList.searchBookError:
            return {
                ...state,
                error: action.isError,
            }
        case ActionNameList.getReviewLikeByBookidsSucceeded:
            return {
                ...state,
                reviewLikeInfo: action.payload,
            }
        case ActionNameList.getReviewLikeByBookidsError:
            return {
                ...state,
                error: action.isError,
            }
        default:
            return state;
    }
}
