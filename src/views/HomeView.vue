<script setup>
import { ref, computed, onMounted } from 'vue'
import AddNote from '../components/AddNote.vue'
import NoteCard from '../components/NoteCard.vue'
import { useNotes } from '../stores/notes'

const categories = ['All', 'Personal', 'Work', 'Social', 'Important']
const activeCategory = ref('All')
const setActiveCategory = (category) => {
  activeCategory.value = category
}

const notesStore = useNotes()

onMounted(() => {
  notesStore.fetchNotes()
})

const filteredNotes = computed(() => {
  if (activeCategory.value === 'All') return notesStore.lists
  return notesStore.lists.filter(note => note.category === activeCategory.value)
})
</script>

<template>
  <div class="flex min-h-screen">
    <div class="w-64 bg-gray-100 p-4">
      <h2 class="text-2xl font-bold mb-6">Categories</h2>
      <ul class="space-y-2">
        <li
          v-for="category in categories"
          :key="category"
          :class="[
            'cursor-pointer px-4 py-2 rounded-lg transition-colors',
            activeCategory === category
              ? 'bg-blue-500 text-white'
              : 'hover:bg-blue-100 text-gray-700'
          ]"
          @click="setActiveCategory(category)"
        >
          {{ category }}
        </li>
      </ul>
    </div>

    <div class="flex-1 p-6 space-y-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <NoteCard
          v-for="(note, index) in filteredNotes"
          :key="index"
          :note="note"
          :id="index"
        />
      </div>

      <AddNote />
    </div>
  </div>
</template>
