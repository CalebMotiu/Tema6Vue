import { Router } from "express"
import {
  getNotes,
  addNewNote,
  deleteNote,
  editNote
} from "../service/notes.service.js"

export const notesRouter = Router()

notesRouter.get("/", (req, res) => {
  res.send(JSON.stringify(getNotes()))
})

notesRouter.post("/add-new-note", (req, res) => {
  const { title, description, category } = req.body

  const check = new RegExp("^[a-zA-Z0-9 ]*$")

  if (!check.test(title) || !check.test(category)) {
    res.status(400).send("Invalid title or category")
    return
  }

  addNewNote({ title, description, category })
  res.send("ok")
})

notesRouter.delete("/delete-note", (req, res) => {
  const { id } = req.body

  const checkId = new RegExp("^[0-9]*$")
  if (!checkId.test(id)) {
    res.status(400).send("Invalid note ID")
    return
  }

  deleteNote(id)
  res.send("ok")
})

notesRouter.put("/edit-note", (req, res) => {
  const { id, title, description, category } = req.body

  const check = new RegExp("^[a-zA-Z0-9 ]*$")
  if ((title && !check.test(title)) || (category && !check.test(category))) {
    res.status(400).send("Invalid title or category")
    return
  }

  editNote(id, { title, description, category })
  res.send("ok")
})
