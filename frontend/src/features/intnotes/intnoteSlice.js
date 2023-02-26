import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import intnoteService from './intnoteService';

const initialState = {
  intnotes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

//Get ticket notes
export const getIntNotes = createAsyncThunk(
  'intnotes/getAll',
  async (interviewId, thunkAPI) => {
    //try catch block
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await intnoteService.getIntNotes(interviewId, token);
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

//Create ticket note
export const createIntNote = createAsyncThunk(
  'intnotes/create',
  async ({ intnoteText, interviewId }, thunkAPI) => {
    //try catch block
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await intnoteService.createIntNote(
        intnoteText,
        interviewId,
        token
      );
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

export const intnoteSlice = createSlice({
  name: 'intnote',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIntNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIntNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.intnotes = action.payload;
      })
      .addCase(getIntNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createIntNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createIntNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.intnotes.push(action.payload);
      })
      .addCase(createIntNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = intnoteSlice.actions;
export default intnoteSlice.reducer;
