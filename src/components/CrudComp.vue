<template>
  <div v-if="loading" class="container mt-5">
    <div class="alert alert-info">Loading movies...</div>
  </div>
  <div v-else-if="error" class="container mt-5">
    <div class="alert alert-danger">Error: {{ error }}</div>
  </div>
  <template v-else>
    <MovieForm
      :form="movieForm"
      :errors="errors"
      :is-editing="isEditing"
      @submit="isEditing ? saveUpdate() : addMovie()"
      @cancel="cancelEdit"
    />
    <MovieTable :movies="movies" @edit="updateMovie" @delete="deleteMovie" />
  </template>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useMovieStore } from '@/stores/movie2'
import { storeToRefs } from 'pinia'
import MovieTable from './MovieTable.vue'
import MovieForm from './MovieForm.vue'

const movieStore = useMovieStore()
const { movies, loading, error } = storeToRefs(movieStore)

onMounted(() => {
  movieStore.fetchMovies()
})

const isEditing = ref(false)
const editingId = ref(null)

const errors = ref({
  title: '',
  director: '',
  genre: '',
  year: ''
})

const movieForm = ref({
  title: '',
  director: '',
  genre: '',
  year: null
})

const validateForm = () => {
  errors.value = {
    title: '',
    director: '',
    genre: '',
    year: ''
  }

  let isValid = true

  if (!movieForm.value.title.trim()) {
    errors.value.title = 'Title is required'
    isValid = false
  }

  if (!movieForm.value.director.trim()) {
    errors.value.director = 'Director is required'
    isValid = false
  }

  if (!movieForm.value.genre) {
    errors.value.genre = 'Genre is required'
    isValid = false
  }

  if (!movieForm.value.year) {
    errors.value.year = 'Year is required'
    isValid = false
  }

  return isValid
}

const addMovie = () => {
  if (!validateForm()) return

  const newMovie = {
    ...movieForm.value
  }
  movieStore.addMovie(newMovie)
  resetForm()
}

const updateMovie = (id) => {
  const movie = movies.value.find(m => m.id === id)
  if (movie) {
    movieForm.value = {
      title: movie.title,
      director: movie.director,
      genre: movie.genre,
      year: movie.year
    }
    isEditing.value = true
    editingId.value = id
  }
}

const saveUpdate = () => {
  if (!validateForm()) return

  if (editingId.value) {
    movieStore.updateMovie(editingId.value, movieForm.value)
    resetForm()
  }
}

const cancelEdit = () => {
  resetForm()
}

const resetForm = () => {
  movieForm.value = {
    title: '',
    director: '',
    genre: '',
    year: null
  }
  errors.value = {
    title: '',
    director: '',
    genre: '',
    year: ''
  }
  isEditing.value = false
  editingId.value = null
}

const deleteMovie = (id) => {
  if (confirm('Are you sure you want to delete this movie?')) {
    movieStore.deleteMovie(id)
    if (isEditing.value && editingId.value === id) {
      resetForm()
    }
  }
}
</script>

