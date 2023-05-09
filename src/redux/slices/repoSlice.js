import { createSlice } from '@reduxjs/toolkit';
import { APIoperations } from 'redux/operations';

const initialState = {
    issues: {
        open: [],
        assigned: [],
        closed: []
    },
    error: null,
    loading: false,
};

export const repoSlice = createSlice({
    name: 'issues',
    initialState,
    extraReducers: {
        [APIoperations.fetchAllIssues.fulfilled](state, action) {
            state.issues.closed = action.payload.filter(issue => issue.state === "closed");
            state.issues.assigned = action.payload.filter(issue => issue.assignee);
            state.issues.open = action.payload.filter(issue => issue.state === "open");
            state.error = null;
            state.loading = false;
        },
        [APIoperations.fetchAllIssues.pending](state, action) {
            state.loading = true;
            state.issues = {
                open: [],
                assigned: [],
                closed: []
            };
            state.error = null;
        },
        [APIoperations.fetchAllIssues.rejected](state, action) {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const issuesReducer = repoSlice.reducer;