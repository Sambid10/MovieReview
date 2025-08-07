import axiosInstance from './axios';
export const addToFavourite = (value: boolean, movieId: number) => {
  axiosInstance.post('/account/22105/favorite', {
    media_type: 'movie',
    media_id: movieId,
    favorite: value,
  });
};
