<template>
  <div class="container mt-5">
    <form @submit.prevent="handleSubmit" class="row g-3">
      <div class="col-12 col-md-6">
        <input
          v-model="localForm.title"
          type="text"
          placeholder="Title"
          class="form-control"
          :class="{ 'is-invalid': localErrors.title }"
        />
        <div v-if="localErrors.title" class="invalid-feedback">{{ localErrors.title }}</div>
      </div>
      <div class="col-12 col-md-6">
        <input
          v-model="localForm.director"
          type="text"
          placeholder="Director"
          class="form-control"
          :class="{ 'is-invalid': localErrors.director }"
        />
        <div v-if="localErrors.director" class="invalid-feedback">{{ localErrors.director }}</div>
      </div>
      <div class="col-12 col-md-6">
        <select
          v-model="localForm.genre"
          class="form-select"
          :class="{ 'is-invalid': localErrors.genre }"
        >
          <option disabled value="">Select Genre</option>
          <option>Action</option>
          <option>Comedy</option>
          <option>Drama</option>
          <option>Horror</option>
          <option>Romance</option>
        </select>
        <div v-if="localErrors.genre" class="invalid-feedback">{{ localErrors.genre }}</div>
      </div>
      <div class="col-12 col-md-6">
        <input
          v-model="localForm.year"
          type="number"
          placeholder="Year"
          class="form-control"
          :class="{ 'is-invalid': localErrors.year }"
        />
        <div v-if="localErrors.year" class="invalid-feedback">{{ localErrors.year }}</div>
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary">
          {{ isEditing ? 'Update Movie' : 'Add Movie' }}
        </button>
        <button v-if="isEditing" type="button" @click="$emit('cancel')" class="btn btn-secondary ms-2">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  form: {
    type: Object,
    required: true
  },
  errors: {
    type: Object,
    required: true
  },
  isEditing: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit', 'cancel'])

const localForm = computed({
  get: () => props.form,
  set: (value) => emit('update:form', value)
})

const localErrors = computed({
  get: () => props.errors,
  set: (value) => emit('update:errors', value)
})

const handleSubmit = () => {
  emit('submit')
}
</script>
