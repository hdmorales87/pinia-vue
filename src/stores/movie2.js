import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { API_CONFIG } from '@/config/api.config'

export const useMovieStore = defineStore('movie2', () => {
  //Composition API

  //State
  const movies = ref([])
  const loading = ref(false)
  const error = ref(null)

  // API Helper
  const apiCall = async (endpoint, options = {}) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  //Actions
  const fetchMovies = async () => {
    try {
      const data = await apiCall(API_CONFIG.endpoints.movies)
      movies.value = data
    } catch (err) {
      console.error('Failed to fetch movies:', err)
    }
  }

  const addMovie = async (movie) => {
    try {
      const response = await apiCall(API_CONFIG.endpoints.movies, {
        method: 'POST',
        body: JSON.stringify(movie)
      })
      movies.value.push({ ...movie, id: response.id })
    } catch (err) {
      console.error('Failed to add movie:', err)
      // Fallback to local add if API fails
      movies.value.push(movie)
    }
  }

  const updateMovie = async (id, updatedData) => {
    try {
      await apiCall(`${API_CONFIG.endpoints.movies}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedData)
      })
      movies.value = movies.value.map(m => m.id === id ? { ...m, ...updatedData } : m)
    } catch (err) {
      console.error('Failed to update movie:', err)
      // Fallback to local update if API fails
      movies.value = movies.value.map(m => m.id === id ? { ...m, ...updatedData } : m)
    }
  }

  const deleteMovie = async (id) => {
    try {
      await apiCall(`${API_CONFIG.endpoints.movies}/${id}`, {
        method: 'DELETE'
      })
      movies.value = movies.value.filter(movie => movie.id !== id)
    } catch (err) {
      console.error('Failed to delete movie:', err)
      // Fallback to local delete if API fails
      movies.value = movies.value.filter(movie => movie.id !== id)
    }
  }

  //Getters
  const numberOfMovies = computed(() => movies.value.length)

  return {
    movies,
    loading,
    error,
    fetchMovies,
    addMovie,
    updateMovie,
    deleteMovie,
    numberOfMovies
  }

})