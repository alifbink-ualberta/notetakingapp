import { useEffect, useMemo, useState } from "react"
import { Note, formatDate } from "./types"
import NoteView from "./NoteView"
import NoteList from "./Notelist"  // Windows is case insensitive, NoteList.tsx is registered as Notelist.tsx
import Button from "./Button"
import Sidebar from "./Sidebar";

function MainNotes() {
  const [notes, setNotes] = useState<Note[]>([]) // for saved notes
  const [draftNote, setDraftNote] = useState<Note | null>(null)
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)
  const [activeTag, setActiveTag] = useState<string | null>(null); // for filtering

  // Load saved notes from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("notes")
    if (stored) {
      setNotes(JSON.parse(stored))
    }
  }, [])

  // new note created, selected through ID, put into draftNote for editing
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
    //setNotes((oldNotes) => [newNote, ...oldNotes]) // add new note to the top of the list
    setSelectedNoteId(newNote.id)
  }

  // determine which note is currently selected using id, set it on draftNote for editing
  const handleSelectNote = (id: string) => {
    const noteToEdit = notes.find((note) => note.id === id);
    if (noteToEdit) {
      setSelectedNoteId(id);
      setDraftNote({ ...noteToEdit }); // clone to create independent draft
    }
  };

  // removed draftNote and deselect note
  const handleCancelNote = () => {
    setDraftNote(null) // throw away unsaved edits
    setSelectedNoteId(null)
  }


  const handleSaveNote = () => {
    if (!draftNote) return;

    if (!draftNote.tags || draftNote.tags.length === 0) {
      alert("Please add at least one tag before saving.");
      return;
    }

    // If the note exists, update it; otherwise, add it as new
    const updatedNotes = notes.some((n) => n.id === draftNote.id) // .some checks if note exists
      ? notes.map((n) => // iterate through notes to find the one to update
          n.id === draftNote.id // if it exists, update it with draftNote and updated date - if the match with id is not found, return note as is
            ? { ...draftNote, updatedAt: formatDate(new Date()) }
            : n
        )
      : [{ ...draftNote, updatedAt: formatDate(new Date()) }, ...notes]; // if it does not, draft note is added to notes list with edited date updated

    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    setDraftNote(null);
    setSelectedNoteId(null);
  }

  const handleUpdateDraft = (updatedNote: Note) => {
    setDraftNote({ ...updatedNote, updatedAt: formatDate(new Date()) });
  };

  function handleDeleteNote(): void {
    if (!selectedNoteId) return;
    const confirmed = window.confirm("Are you sure you want to delete this note?");
    if (!confirmed) return;

    const updatedNotes = notes.filter((note) => note.id !== selectedNoteId);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setSelectedNoteId(null);
    setDraftNote(null);
  }

  const filteredNotes = useMemo(() => {
    if (!activeTag) return notes;
    return notes.filter((note) => note.tags.includes(activeTag));
  }, [notes, activeTag]);

  return (
    <div className="main-layout">
      {/* Sidebar on the left */}
      <Sidebar
        notes={notes}
        activeTag={activeTag}
        onTagSelect={setActiveTag}
        onClearFilter={() => setActiveTag(null)}
      />

      {/* Notes list */}
      <div className="note-list-with-btn">
        <Button label="+ Create New Note" handleClick={handleAddNote} />
        <NoteList notes={filteredNotes} onSelect={handleSelectNote} />
      </div>

      {/* Note editor */}
      <div className="note-view">
        {/* Only show NoteView and buttons when a note is open */}
        {draftNote ? (
          <>
            <NoteView note={draftNote} onUpdate={handleUpdateDraft} />

            <div className="save-cancel-btns">
              <Button label="Save Note" handleClick={handleSaveNote} />
              <Button label="Cancel" variant="cancel" handleClick={handleCancelNote} />
            </div>

            <div className="special-btns">
              <Button
                label="Delete Note"
                variant="special"
                handleClick={handleDeleteNote}
              />
            </div>
          </>
        ) : (
          <div className="note-empty"></div>
        )}
      </div>

    </div>
  );
}

export default MainNotes