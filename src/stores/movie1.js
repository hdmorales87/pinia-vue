import { defineStore } from 'pinia'

export const useMovieStore = defineStore('movie1', {
  //Options API 

  //State
  state: () => ({
    movies: [],
  }),
  
  //Actions
  actions: {
    addMovie: (movie) => {
      this.movies.push(movie)
    }
  },

  //Getters
  getters: {
    numberOfMovies: (state) => state.movies.length
  }    
  
})
