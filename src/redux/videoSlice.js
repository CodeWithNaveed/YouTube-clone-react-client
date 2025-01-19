import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentVideo: null,
    loading: false,
    error: false
};

export const videoSlice = createSlice({
    name: "video", // Updated name for clarity
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = true;
        },
        fetchSuccess: (state, action) => {
            state.loading = false;
            state.currentVideo = action.payload;
            state.error = false; // Reset error on successful fetch
        },
        fetchFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        like: (state, action) => {
            if (!state.currentVideo.likes.includes(action.payload)) {
                state.currentVideo.likes.push(action.payload);
                state.currentVideo.dislikes = state.currentVideo.dislikes.filter(
                    (userId) => userId !== action.payload
                );
            }
        },
        dislike: (state, action) => {
            if (!state.currentVideo.dislikes.includes(action.payload)) {
                state.currentVideo.dislikes.push(action.payload);
                state.currentVideo.likes = state.currentVideo.likes.filter(
                    (userId) => userId !== action.payload
                );
            }
        },
        resetError: (state) => {
            state.error = false;
        }
    }
});

export const { fetchStart, fetchSuccess, fetchFailure, like, dislike, resetError } = videoSlice.actions;
export default videoSlice.reducer;
