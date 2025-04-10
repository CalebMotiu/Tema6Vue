<script setup>
import AddNote from '../components/AddNote.vue'
import NoteCard from '../components/NoteCard.vue' 

import { useNotes } from "../stores/notes"
const notesStore = useNotes()

import { onMounted } from 'vue'
onMounted(() => {
  notesStore.fetchNotes()
})
</script>

<template>
  <h1 class="text-3xl font-bold p-4">Notes</h1>

  <div class="flex flex-wrap gap-4 p-4">
    <NoteCard
      v-for="(note, index) in notesStore.lists"
      :key="index"
      :note="note"
      :id="index"
    />
  </div>

  <div class="p-4">
    <AddNote />
  </div>
</template>
