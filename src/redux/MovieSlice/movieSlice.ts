import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Movie } from '../../types/MovieTypes';
const initialState = {
  popularmovie: [] as Movie[],
  upcomingmovie: [] as Movie[],
  topratedmovie: [] as Movie[],
};

export const MovieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    popularmovie: (state, action: PayloadAction<Movie>) => {
      state.popularmovie.push(action.payload);
    },
    upcomingmovie: (state, action: PayloadAction<Movie>) => {
      state.upcomingmovie.push(action.payload);
    },
    topratedmovie: (state, action: PayloadAction<Movie>) => {
      state.topratedmovie.push(action.payload);
    },
  },
});

export const {
 popularmovie,topratedmovie,upcomingmovie
} = MovieSlice.actions;

export default MovieSlice.reducer;
