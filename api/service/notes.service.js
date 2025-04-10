export const notes = []

export const addNewNote = ({ title, description, category }) => {
  notes.push({ title, description, category })
}

export const deleteNote = (id) => {
  notes.splice(id, 1)
}

export const editNote = (id, updatedData) => {
  notes[id] = { ...notes[id], ...updatedData }
}

export const getNotes = () => {
  return notes
}
