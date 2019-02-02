import { ActionNameList } from '../ActionNameList';
const initialState = [];

export default function SearchReducer(state = initialState, action) {
    switch (action.type) {
        case ActionNameList.searchBookSucceeded:
            return action.payload;
        case ActionNameList.searchBookError:
            return action.payload;
        default:
            return state;
    }
}
