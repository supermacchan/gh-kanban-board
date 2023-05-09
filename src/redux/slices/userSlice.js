import { createSlice } from '@reduxjs/toolkit';
import { APIoperations } from 'redux/operations';

const initialState = {
    queries: [],
    current: {
        owner: null,
        repo: null
    },
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        onFormSubmit(state, action) {
            console.log(action);
            state.current.owner = action.payload.owner;
            state.current.repo = action.payload.repo;
        }
    },
    extraReducers: {
        [APIoperations.fetchAllIssues.fulfilled](state, action) {
            state.queries.push({
                owner: action.meta.arg.owner,
                repo: action.meta.arg.repo,
                issues: {
                    open: action.payload.filter(issue => issue.state === "open"),
                    assigned: action.payload.filter(issue => issue.assignee),
                    closed: action.payload.filter(issue => issue.state === "closed")
                }
            })
            state.error = null;
        },
        [APIoperations.fetchAllIssues.rejected](state, action) {
            state.error = action.payload;
        },
    },
});

export const { onFormSubmit } = userSlice.actions;
export const userReducer = userSlice.reducer;