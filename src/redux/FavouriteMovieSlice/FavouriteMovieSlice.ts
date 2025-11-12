import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavouriteMovie {
  favourited: boolean;
  movieName: string;
  moviePoster: string;
  movieId:number
}

interface FavouriteMoviesState {
  favMap: Record<number, FavouriteMovie>;
}

const initialState: FavouriteMoviesState = {
  favMap: {},
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setFavourites: (
      state,
      action: PayloadAction<Record<number, FavouriteMovie>>,
    ) => {
      state.favMap = action.payload;
    },
    addOrUpdateFavorite: (
      state,
      action: PayloadAction<{ movieId: number; data: FavouriteMovie }>,
    ) => {
      state.favMap[action.payload.movieId] = action.payload.data;
    },
    removeFavourite: (state, action: PayloadAction<number>) => {
      delete state.favMap[action.payload];
    },
  },
});

export const { setFavourites, addOrUpdateFavorite, removeFavourite } =
  movieSlice.actions;

export default movieSlice.reducer;
