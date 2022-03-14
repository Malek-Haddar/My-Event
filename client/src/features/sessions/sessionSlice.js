import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sessionService from "./sessionService";

const initialState = {
  sessions: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new session
export const createSession = createAsyncThunk(
  "sessions/create",
  async (sessionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await sessionService.createSession(sessionData, token);
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

// Get sessions
export const getSessions = createAsyncThunk(
  "sessions/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await sessionService.getSessions(token);
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

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sessions.push(action.payload);
      })
      .addCase(createSession.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getSessions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSessions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sessions = action.payload;
      })
      .addCase(getSessions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = sessionSlice.actions;
export default sessionSlice.reducer;
