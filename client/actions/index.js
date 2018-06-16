import {ADD_ARTICLE, SET_CURRENT_USER, ADD_NEW_QUESTION, SET_QUESTION_LIST} from "../constants/action-types";

export const addArticle = article =>
    ({ type: ADD_ARTICLE, payload: article});


export const setCurrentUser = currentUser =>
    ({ type: SET_CURRENT_USER, payload: currentUser})


export const addNewQuestion = question =>
    ({ type: ADD_NEW_QUESTION, payload: question})

export const setQuestionList = questions =>
    ({type: SET_QUESTION_LIST, payload: questions})