import { Octokit } from "octokit";
import { createAsyncThunk } from '@reduxjs/toolkit';

const octokit = new Octokit({
    auth: process.env.GIT_TOKEN
});

const fetchAllIssues = createAsyncThunk(
    'issues/fetchAll',
    async ({ owner, repo }, thunkAPI) => {
      try {
        const { data }  = await octokit.request('GET /repos/{owner}/{repo}/issues', {
            owner: owner,
            repo: repo,
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          })

        console.log(data);
        return data;
      } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
);

export const APIoperations = {
    fetchAllIssues,
}