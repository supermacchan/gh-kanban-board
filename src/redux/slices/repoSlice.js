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
    reducers: {
        updateBoards(state, action) {
            action.payload.map(b => state.issues[b.title] = b.issues);
        },
    },
    extraReducers: {
        [APIoperations.fetchAllIssues.fulfilled](state, action) {
            const filteredResult = action.payload.map(issue => {
                return {
                    id: issue.id,
                    title: issue.title,
                    number: issue.number,
                    created_at: issue.created_at,
                    user: issue.user.login,
                    comments: issue.comments,
                    assignee: issue.assignee,
                    state: issue.state
                }
            });
            state.issues.open = filteredResult.filter(issue => issue.state === "open");
            state.issues.assigned = filteredResult.filter(issue => issue.assignee);
            state.issues.closed = filteredResult.filter(issue => issue.state === "closed");
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

export const { updateBoards } = repoSlice.actions;
export const issuesReducer = repoSlice.reducer;