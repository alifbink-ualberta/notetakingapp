import { useState } from "react"
import { Note, formatDate } from "./types"
import NoteView from "./NoteView"
import NoteList from "./Notelist"  // Windows is case insensitive, NoteList.tsx is registered as Notelist.tsx
import Button from "./Button"

function MainNotes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)

  const handleAddNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: "Untitled",
      content: "",
      tags: [],
      createdAt: new Date(),
      updatedAt: formatDate(new Date())
  }

  setNotes((oldNotes) => [newNote, ...oldNotes])
  setSelectedNoteId(newNote.id)
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

  /* selectedNote is found from the notes array using id - on any change, handleUpdate is called */
  const selectedNote = notes.find((n) => n.id === selectedNoteId) || null

  
  return (
    <div className="main-notes">
        <div className="note-list">
          <Button label="+ Create New Note" handleClick={handleAddNote}/>

          <NoteList 
              notes={notes} 
              onSelect={setSelectedNoteId}
          />
        </div>

        <NoteView
            note={selectedNote}
            onUpdate={handleUpdate}
        />
    </div>
  )
}

export default MainNotes