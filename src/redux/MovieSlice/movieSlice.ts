import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MovieApiResponse } from '../../types/MovieTypes';

interface MovieState {
  [category: string]: MovieApiResponse | undefined;
}

const initialState: MovieState = {};

export const MovieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMoviesforCategory: (
      state,
      action: PayloadAction<{ category: string; data: MovieApiResponse }>,
    ) => {
      state[action.payload.category] = action.payload.data;
    },
  },
});

export const { setMoviesforCategory } = MovieSlice.actions;

export default MovieSlice.reducer;
