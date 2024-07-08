import { GET_SAVED_ITEMS, ADD_TO_SAVED, REMOVE_FROM_SAVED } from '../actions/types';

const initialState = {
    savedItems: [],
    loading: true
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_SAVED_ITEMS:
            return {
                ...state,
                savedItems: action.payload,
                loading: false
            };
        case ADD_TO_SAVED:
            return {
                ...state,
                savedItems: [action.payload, ...state.savedItems]
            };
        case REMOVE_FROM_SAVED:
            return {
                ...state,
                savedItems: state.savedItems.filter(item => item.product._id !== action.payload)
            };
        default:
            return state;
    }
}
