<script setup>
import { useNotes } from '../stores/notes.js'

const notes = useNotes()
const props = defineProps({
  note: Object,
  id: Number
})

function deleteNote() {
  notes.deleteNote(props.id)
}
</script>


<template>
  <div class="bg-white shadow-md rounded-lg p-4 w-full max-w-sm">
    <h3 class="text-xl font-semibold">{{ note.title }}</h3>
    <p class="text-gray-600 mt-2">{{ note.description }}</p>
    <span class="text-sm mt-4 inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded">{{ note.category }}</span>
    <button
        class="ms-4 rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 focus:outline-none dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        @click="deleteNote">
        <i class="bi bi-x-circle"></i>
    </button>
  </div>
</template>
