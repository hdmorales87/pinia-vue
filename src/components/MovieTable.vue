<template>
  <div class="container mt-5">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Title</th>
          <th>Director</th>
          <th>Genre</th>
          <th>Year</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="movie in movies" :key="movie.id">
          <td>{{ movie.title }}</td>
          <td>{{ movie.director }}</td>
          <td>{{ movie.genre }}</td>
          <td>{{ movie.year }}</td>
          <td>
            <button class="btn btn-primary me-2" @click="$emit('edit', movie.id)">Edit</button>
            <button class="btn btn-danger" @click="$emit('delete', movie.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  movies: {
    type: Array,
    required: true
  }
})

defineEmits(['edit', 'delete'])
</script>
