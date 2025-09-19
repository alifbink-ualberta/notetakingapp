import { useState } from "react"
import { Note } from "./types"
import NoteView from "./NoteView"
import NoteList from "./Notelist"

function MainNotes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)


  /* handleUpdate takes the updatedNote as parameter -> setNotes takes all notes as parameter and 
  searches through to check for same id - updates if found, otherwise lets it be as it is. */
  const handleUpdate = (updatedNote: Note) => {
    setNotes((oldNotes) =>
      oldNotes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      )
    )
  }

  /* selectedNote is found from the notes array using id - on any change, handleUpdate is called */
  const selectedNote = notes.find((n) => n.id === selectedNoteId) || null

  
  return (
    <div className="main">
        <NoteList 
            notes={notes} 
            onSelect={setSelectedNoteId}
        />
        <NoteView
            note={selectedNote}
            onUpdate={handleUpdate}
        />
    </div>
  )
}