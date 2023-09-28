import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postsReducer from "./posts";

const rootReducer = combineReducers({
    posts: postsReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
