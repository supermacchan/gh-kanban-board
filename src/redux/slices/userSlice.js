import { createSlice } from '@reduxjs/toolkit';
import { APIoperations } from 'redux/operations';

const initialState = {
    queries: [],
    current: {
        owner: null,
        repo: null,
        stars: null
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
            state.queries.push({
                owner: action.meta.arg.owner,
                repo: action.meta.arg.repo,
                issues: {
                    open: filteredResult.filter(issue => issue.state === "open"),
                    assigned: filteredResult.filter(issue => issue.assignee),
                    closed: filteredResult.filter(issue => issue.state === "closed")
                }
            })
            state.error = null;
        },
        [APIoperations.fetchAllIssues.rejected](state, action) {
            state.current = {
                owner: null,
                repo: null,
                stars: null
            };
            state.error = action.payload;
        },

        [APIoperations.fetchStars.fulfilled](state, action) {
            state.current.stars = action.payload;
            state.error = null;
        },
        [APIoperations.fetchStars.rejected](state, action) {
            state.error = action.payload;
        }
    },
});

export const { onFormSubmit } = userSlice.actions;
export const userReducer = userSlice.reducer;