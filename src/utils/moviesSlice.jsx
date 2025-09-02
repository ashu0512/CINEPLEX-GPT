import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    trailerVideo: null,
    // popular: [],
    // topRated: [],
    // upcoming: [],
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },

    addTrailerVideo:(state, action) => {
      state.trailerVideo = action.payload;
    }
    // setPopular: (state, action) => {
    //   state.popular = action.payload;
    // },
    // setTopRated: (state, action) => {
    //   state.topRated = action.payload;
    // },
    // setUpcoming: (state, action) => {
    //   state.upcoming = action.payload;
    // },
  },
});

export const { addNowPlayingMovies, addTrailerVideo } = moviesSlice.actions;

export default moviesSlice.reducer;
