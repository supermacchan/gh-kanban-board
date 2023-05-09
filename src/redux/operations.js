import { Octokit } from "octokit";

import { createAsyncThunk } from '@reduxjs/toolkit';

const octokit = new Octokit({
    auth: process.env.GIT_TOKEN
});

const fetchAllIssues = createAsyncThunk(
    'repo/fetchAllIssues',
    async ({ owner, repo }, thunkAPI) => {
      try {
        const { data }  = await octokit.request('GET /repos/{owner}/{repo}/issues', {
            owner: owner,
            repo: repo,
            state: 'all',
            per_page: 100,
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

const fetchStars = createAsyncThunk(
  'repo/fetchStars',
  async ({ owner, repo }, thunkAPI) => {
    try {
      const { data }  = await octokit.request('GET /repos/{owner}/{repo}', {
        owner: owner,
        repo: repo,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      })

      console.log(data.stargazers_count);
      return data.stargazers_count;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
)

export const APIoperations = {
    fetchAllIssues,
    fetchStars
}