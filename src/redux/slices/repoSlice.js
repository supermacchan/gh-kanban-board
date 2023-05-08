import { createSlice } from '@reduxjs/toolkit';
import { APIoperations } from 'redux/operations';

const initialState = {
    // queries: [{
    //     owner: 'user',
    //     repo: 'shalala',
    //     issues: []
    // }],
    issues: [],
    error: null,
    loading: false,
};

export const repoSlice = createSlice({
    name: 'issues',
    initialState,
    extraReducers: {
        [APIoperations.fetchAllIssues.fulfilled](state, action) {
            state.issues = action.payload;
            state.error = null;
            state.loading = false;
        },
        [APIoperations.fetchAllIssues.pending](state, action) {
            state.loading = true;
            state.issues = [];
            state.error = null;
        },
        [APIoperations.fetchAllIssues.rejected](state, action) {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const issuesReducer = repoSlice.reducer;