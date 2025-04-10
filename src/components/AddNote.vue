<script setup>
import { ref } from 'vue';
import { useNotes } from '../stores/notes';

const inputMode = ref(false)
const noteTitle = ref("")
const noteDescription = ref("")
const noteCategory = ref("Personal") 
const isError = ref(false)

const notesStore = useNotes()

function changeMode() {
  inputMode.value = !inputMode.value
  noteTitle.value = ""
  noteDescription.value = ""
  noteCategory.value = "Personal"
}

function saveNote() {
  const checkname = new RegExp("^[a-zA-Z0-9 ]*$")
  if (!checkname.test(noteTitle.value)) {
    isError.value = true
    setTimeout(() => {
      isError.value = false
    }, 4000)
    return
  }

  notesStore.addNewNote({
    title: noteTitle.value,
    description: noteDescription.value,
    category: noteCategory.value
  })

  changeMode();
}

function handleEnter(event) {
  event.preventDefault();
  saveNote();
}
</script>

<template>
  <button
    v-if="!inputMode"
    class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
    @click="changeMode"
  >
    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
      <i class="bi bi-plus-circle"></i> Add New Note
    </span>
  </button>

  <form v-else class="max-w-md mx-auto space-y-4" @submit.prevent="saveNote">
    <div>
      <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-white">Title</label>
      <input
        v-model="noteTitle"
        type="text"
        placeholder="Note title..."
        class="w-full p-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        required
      />
    </div>

    <div>
      <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-white">Description</label>
      <textarea
        v-model="noteDescription"
        placeholder="Note description..."
        class="w-full p-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        rows="3"
      ></textarea>
    </div>

    <div>
      <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-white">Category</label>
      <select
        v-model="noteCategory"
        class="w-full p-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
        <option value="Social">Social</option>
        <option value="Important">Important</option>
      </select>
    </div>

    <div class="flex justify-end gap-2">
      <button
        @click.prevent="changeMode"
        class="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
      >
        <i class="bi bi-x-circle"></i> Cancel
      </button>
      <button
        type="submit"
        class="bg-blue-700 hover:bg-blue-800 text-white font-medium px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
      >
        Add
      </button>
    </div>

    <p v-if="isError" class="text-red-500 text-sm mt-2">Please enter a valid title (letters and numbers only).</p>
  </form>
</template>
