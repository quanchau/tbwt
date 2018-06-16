import { ADD_ARTICLE, SET_CURRENT_USER, ADD_NEW_QUESTION, SET_QUESTION_LIST} from "../constants/action-types";

const initialState = {
    articles: [],
    currentUser: {email: undefined},
    questions: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ARTICLE:
            return {...state, articles: [...state.articles, action.payload]};
        case SET_CURRENT_USER:
            console.log(action.payload);
            return {... state, currentUser: action.payload};
        case ADD_NEW_QUESTION:
            return {...state, questions: [...state.questions, action.payload]};
        case SET_QUESTION_LIST:
            return {...state, questions: action.payload};
        default:
            return state;
    }
}

export default rootReducer;