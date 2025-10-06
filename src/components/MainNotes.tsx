import { useEffect, useState } from "react"
import { Note, formatDate } from "./types"
import NoteView from "./NoteView"
import NoteList from "./Notelist"  // Windows is case insensitive, NoteList.tsx is registered as Notelist.tsx
import Button from "./Button"

function MainNotes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [draftNote, setDraftNote] = useState<Note | null>(null)
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)

  // Load saved notes from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("notes")
    if (stored) {
      setNotes(JSON.parse(stored))
    }
  }, [])

  const selectedNote = notes.find((n) => n.id === selectedNoteId) || null

  // Sync draftNote with selectedNote when selectedNoteId changes

  useEffect(() => {
    if (selectedNoteId) {
      const selectedNote = notes.find((n) => n.id === selectedNoteId) || null
      setDraftNote(selectedNote ? { ...selectedNote } : null) // copy to draft
    }
  }, [selectedNoteId, notes])

  const handleAddNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: "",
      content: "",
      tags: [],
      createdAt: new Date(),
      updatedAt: formatDate(new Date())
  }

  setDraftNote(newNote) // set draftNote to the new note
  setNotes((oldNotes) => [newNote, ...oldNotes]) // add new note to the top of the list
  setSelectedNoteId(newNote.id)
}

  const handleCancelNote = () => {
    setDraftNote(null) // throw away unsaved edits
    setSelectedNoteId(null)
  }


  const handleSaveNote = () => {
    if (!selectedNoteId) return
    
    const noteToSave = notes.find((n) => n.id === selectedNoteId)
    if (!noteToSave) return

    if (!noteToSave.tags || noteToSave.tags.length === 0) {
      alert("Please add at least one tag before saving.")
      return
    }

    // Save the whole notes array
    localStorage.setItem("notes", JSON.stringify(notes))

    setSelectedNoteId(null) // optional
  }

  /* TODO: useMemo and useCallback should be used here */

  /* handleUpdate takes the updatedNote as parameter -> setNotes takes all notes as parameter and 
  searches through to check for same id - updates if found, otherwise lets it be as it is. */
  const handleUpdate = (updatedNote: Note) => {
    setNotes((oldNotes) =>
      oldNotes.map((note) =>
        note.id === updatedNote.id ? {...updatedNote, updatedAt: formatDate(new Date()) }: note
      )
    )
  }

  function handleDeleteNote(): void {
    if (!selectedNoteId) return;
    const confirmed = window.confirm("Are you sure you want to delete this note?");
    if (confirmed) {
      setNotes((oldNotes) => oldNotes.filter((note) => note.id !== selectedNoteId));
      setSelectedNoteId(null);
      setDraftNote(null);
      localStorage.setItem("notes", JSON.stringify(notes.filter((note) => note.id !== selectedNoteId)));
    }
  }

  return (
    <div className="main-notes">
        <div className="note-list-with-btn">
          <Button label="+ Create New Note" handleClick={handleAddNote}/>

          <NoteList 
              notes={notes} 
              onSelect={setSelectedNoteId}
          />
        </div>

        <div className="note-view">
          <NoteView
              note={selectedNote}
              onUpdate={handleUpdate}
          />
          <div className="save-cancel-btns">
            <Button label="Save Note" handleClick={handleSaveNote}/>
            <Button label="Cancel" variant="cancel" handleClick={handleCancelNote}/>
          </div>
        </div>
        <div className="special-btns">
          <Button label="Delete Note" variant="special" handleClick={handleDeleteNote}/>
        </div>
    </div>
  )
}

export default MainNotes