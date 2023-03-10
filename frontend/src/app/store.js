import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import projectReducer from '../features/projects/projectSlice';
import noteReducer from '../features/notes/noteSlice';
import intnoteReducer from '../features/intnotes/intnoteSlice';
import interviewReducer from '../features/interviews/interviewSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    interviews: interviewReducer,
    notes: noteReducer,
    intnotes: intnoteReducer,
  },
});
