import { Note } from "./types.ts"
import ListCard from "./ListCard.tsx"

type NoteListProps = {
  notes: Note[]
  onSelect: (id: string) => void
}

function NoteList({ notes, onSelect }: NoteListProps) {
  return (
    <div className="note-list">
      {notes.map((noteItem, index) => (
        <div key={noteItem.id}>
          <ListCard note={noteItem} onSelect={onSelect} />
          {index !== notes.length - 1 && <hr className="break-bar" />}
        </div>
      ))}
    </div>
  )
}

export default NoteList