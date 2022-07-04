import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import galleryService from "./galleryService";

const initialState = {
  galleries: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new event
export const createGallery = createAsyncThunk(
  "galleries/create",
  async (galleryData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await galleryService.createGallery(galleryData, token);
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
export const getGalleries = createAsyncThunk(
  "galleries/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await galleryService.getGalleries(token);
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


// delete gallery

export const deleteGallery = createAsyncThunk(
  "galleries/delete",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await galleryService.deleteGallery(token, data.galleryId);
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

export const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGallery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGallery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.galleries.push(action.payload);
      })
      .addCase(createGallery.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getGalleries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGalleries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.galleries = action.payload;
      })
      .addCase(getGalleries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(deleteGallery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGallery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.galleries = state.galleries.filter(
          (gallery) => gallery._id !== action.payload.data.galleryId
        );
      })
      .addCase(deleteGallery.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const { reset } = gallerySlice.actions;
export default gallerySlice.reducer;
