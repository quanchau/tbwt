import {ADD_ARTICLE, SET_CURRENT_USER} from "../constants/action-types";

export const addArticle = article =>
    ({ type: ADD_ARTICLE, payload: article});


export const setCurrentUser = currentUser =>
    ({ type: SET_CURRENT_USER, payload: currentUser})