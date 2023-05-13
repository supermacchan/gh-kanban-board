import { createSlice } from '@reduxjs/toolkit';
import { APIoperations } from 'redux/operations';

const initialState = {
    queries: [],
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
                if (state.queries[i].owner === owner 
                    && state.queries[i].repo === repo) {
                        state.queries[i].issues.open = boards.find(board => board.title === 'open').issues;
                        state.queries[i].issues.assigned = boards.find(board => board.title === 'assigned').issues;
                        state.queries[i].issues.closed = boards.find(board => board.title === 'closed').issues;
                        console.log("обновили историю state");
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
            const owner = action.meta.arg.owner;
            const repo = action.meta.arg.repo;
            let isInQueries;

            for (let i = 0; i < state.queries.length; i++) {
                console.log("проверяю, есть ли в истории репо, который я сейчас фетчу");
                if (state.queries[i].owner === owner 
                    && state.queries[i].repo === repo) {
                        console.log("нашелся!!");
                        isInQueries = true;
                    break;
                  }
            }

            if (!isInQueries) {
                console.log("такого репо не нахожу, но сейчас запушу!!");
                state.queries.push({
                    owner: action.meta.arg.owner,
                    repo: action.meta.arg.repo,
                    issues: {
                        open: filteredResult.filter(issue => issue.state === "open"),
                        assigned: filteredResult.filter(issue => issue.assignee),
                        closed: filteredResult.filter(issue => issue.state === "closed")
                    }
                })
            }   
        },
    },
});

export const { updateHistory } = historySlice.actions;
export const historyReducer = historySlice.reducer;