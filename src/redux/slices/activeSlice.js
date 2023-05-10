import { createSlice } from '@reduxjs/toolkit';
import { APIoperations } from 'redux/operations';

const initialState = {
    issues: {
        open: [],
        assigned: [],
        closed: []
    },
    current: {
        owner: null,
        repo: null,
        stars: null
    },
    error: null,
    loading: false,
};

export const activeSlice = createSlice({
    name: 'active',
    initialState,
    reducers: {
        onFormSubmit(state, action) {
            console.log(action);
            state.current.owner = action.payload.owner;
            state.current.repo = action.payload.repo;
        },
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

export const { onFormSubmit, updateBoards } = activeSlice.actions;
export const activeReducer = activeSlice.reducer;