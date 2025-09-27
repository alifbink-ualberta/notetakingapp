import { useState } from "react"
import { Note, formatDate } from "./types"
import NoteView from "./NoteView"
import NoteList from "./Notelist"  // Windows is case insensitive, NoteList.tsx is registered as Notelist.tsx
import Button from "./Button"

function MainNotes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)

  /* selectedNote is found from the notes array using id - on any change, handleUpdate is called */
  const selectedNote = notes.find((n) => n.id === selectedNoteId) || null

  const handleAddNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: "Untitled",
      content: "",
      tags: [],
      createdAt: new Date(),
      updatedAt: formatDate(new Date())
  }

  setNotes((oldNotes) => [newNote, ...oldNotes]) // add new note to the start of the array
  setSelectedNoteId(newNote.id)
}

  const handleCancelNote = () => {
    if (!selectedNoteId) return;
    const noteToCancel = notes.find((n) => n.id === selectedNoteId);
    if (noteToCancel) {
      // If the note is new and empty, remove it from the list
      if (noteToCancel.title === "Untitled" && noteToCancel.content === "") {
        setNotes((oldNotes) => oldNotes.filter((n) => n.id !== selectedNoteId));
        setSelectedNoteId(null);
      } else {
        // Otherwise, just deselect the note
        setSelectedNoteId(null);
      }
    }
  }

const handleSaveNote = () => {
  if (!selectedNoteId) return
  const noteToSave = notes.find((n) => n.id === selectedNoteId)
  if (!noteToSave) return

  // save into localStorage
  localStorage.setItem("notes", JSON.stringify(notes))

  // optional: clear selection
  setSelectedNoteId(null)
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



  return (
    <div className="main-notes">
        <div className="note-list">
          <Button label="+ Create New Note" handleClick={handleAddNote}/>

          <NoteList 
              notes={notes} 
              onSelect={setSelectedNoteId}
          />
        </div>

        <div className="divider">
          <NoteView
              note={selectedNote}
              onUpdate={handleUpdate}
          />
          <Button label="Save" handleClick={handleSaveNote}/>
          <Button label="Cancel" handleClick={handleCancelNote}/>
        </div>
    </div>
  )
}

export default MainNotes