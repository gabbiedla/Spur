import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import interviewService from './interviewService';

const initialState = {
  interviews: [],
  interview: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

//Create new project
export const createInterview = createAsyncThunk(
  'interviews/create',
  async (interviewData, thunkAPI) => {
    //try catch block
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await interviewService.createInterview(interviewData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get user projects
export const getInterviews = createAsyncThunk(
  'interviews/getAll',
  async (_, thunkAPI) => {
    //try catch block
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await interviewService.getInterviews(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get user project
export const getInterview = createAsyncThunk(
  'interviews/get',
  async (interviewId, thunkAPI) => {
    //try catch block
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await interviewService.getInterview(interviewId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createInterview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createInterview.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createInterview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getInterviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInterviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects = action.payload;
      })
      .addCase(getInterviews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getInterview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInterview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.project = action.payload;
      })
      .addCase(getInterview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = interviewSlice.actions;
export default interviewSlice.reducer;
