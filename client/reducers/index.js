import { ADD_ARTICLE, SET_CURRENT_USER} from "../constants/action-types";

const initialState = {
    articles: [],
    currentUser: {email: "undefined", password: "undefined"},
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ARTICLE:
            return {...state, articles: [...state.articles, action.payload]};
        case SET_CURRENT_USER:
            return {... state, currentUser: action.payload};
        default:
            return state;
    }
}

export default rootReducer;