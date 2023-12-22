import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@reduxjs/toolkit/query';
import axios from 'axios';

interface Show {
  id: number;
  name: string;
}

interface ShowsState {
  data: Show[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ShowsState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchShows = createAsyncThunk('shows/fetchShows', async (query: string) => {
  const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
  const showsData: Show[] = response.data.map((show: any) => ({
    id: show.show.id,
    name: show.show.name,
  }));
  return showsData;
});

const showsSlice = createSlice({
  name: 'shows',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShows.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShows.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchShows.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const selectShows = (state: RootState) => state.shows.data;

export default showsSlice.reducer;
