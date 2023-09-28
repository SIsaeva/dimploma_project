import { createSlice } from "@reduxjs/toolkit";
import postService from "../services/posts.service";

const postsSlice = createSlice({
    name: "posts",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        postsRequested: (state) => {
            state.isLoading = true;
        },
        postsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        postsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        addPost: (state, action) => {
            state.entities.push(action.payload);
        },
        addPostFailed: (state, action) => {
            state.error = action.payload;
        },
        removePost: (state, action) => {
            state.entities = state.entities.filter(
                (post) => post._id !== action.payload
            );
        },
        removePostFailed: (state, action) => {
            state.error = action.payload;
        }
    }
});

const { reducer: postsReducer, actions } = postsSlice;
const {
    postsRequested,
    postsReceived,
    postsRequestFailed,
    addPost,
    addPostFailed,
    removePost,
    removePostFailed
} = actions;

export const loadPostsList = () => async (dispatch) => {
    dispatch(postsRequested());
    try {
        const { content } = await postService.getPosts();
        dispatch(postsReceived(content));
    } catch (error) {
        console.log('ERROR!!!!!!');
        dispatch(postsRequestFailed(error.message));
    }
};

export const createPost = (data) => async (dispatch) => {
    try {
        const { content } = await postService.createPost(data);
        dispatch(addPost(content));
    } catch (error) {
        addPostFailed(error.message);
    }
};

export const deletePost = (commentId) => async (dispatch) => {
    try {
        const { content } = await postService.removePost(commentId);
        if (!content) {
            dispatch(removePost(commentId));
        }
    } catch (error) {
        removePostFailed(error.message);
    }
};

export const getPosts = () => (state) => state.posts.entities;
export const getPostsLoadingStatus = () => (state) =>
   state.posts.isLoading;

export default postsReducer;
