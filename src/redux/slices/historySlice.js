import { createSlice } from '@reduxjs/toolkit';
import { APIoperations } from 'redux/operations';

const initialState = {
    queries: [],
    // current: {
    //     owner: null,
    //     repo: null,
    //     stars: null
    // },
    error: null,
};

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        updateHistory(state, action) {
            const boards = action.payload.boards;
            const owner = action.payload.owner;
            const repo = action.payload.repo;
            console.log(boards);
            for (let i = 0; i < state.queries.length; i++) {
                console.log("процесс пошел");
                console.log(owner);
                if (state.queries[i].owner === owner 
                    && state.queries[i].repo === repo) {
                        state.queries[i].issues.open = boards.find(board => board.title === 'open').issues;
                        state.queries[i].issues.assigned = boards.find(board => board.title === 'assigned').issues;
                        state.queries[i].issues.closed = boards.find(board => board.title === 'closed').issues;
                        console.log("обновили историю");
                    break;
                  }
            }
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
    },
});

export const { updateHistory } = historySlice.actions;
export const historyReducer = historySlice.reducer;