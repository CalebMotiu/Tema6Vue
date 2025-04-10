import { defineStore } from "pinia"
import axios from "axios"

export const useNotes = defineStore("notes", {
  state: () => {
    return {
      lists: [] 
    }
  },
  actions: {
    fetchNotes() {
      axios.get("http://localhost:3000/notes").then(response => {
        this.lists = response.data
      })
    },

    addNewNote({ title, description, category }) {
      const newNote = {
        title,
        description,
        category
      }

      this.lists.push(newNote)

      axios.post(
        "http://localhost:3000/notes/add-new-note",
        newNote,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
    },

    deleteNote(id) {
      this.lists.splice(id, 1)

      axios.delete("http://localhost:3000/notes/delete-note", {
        headers: {
          "Content-Type": "application/json"
        },
        data: { id }
      })
    },

    editNote(noteId, updatedData) {
      Object.assign(this.lists[noteId], updatedData)

      axios.put(
        "http://localhost:3000/notes/edit-note",
        {
          id: noteId,
          ...updatedData
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
    }
  }
})
