import { Note } from "./types.ts"
import ListCard from "./ListCard.tsx"

type NoteListProps = {
  notes: Note[]
  onSelect: (id: string) => void
}

function NoteList( {notes, onSelect} : NoteListProps) {
    return (
        <div className="note-list">
            {notes.map((noteItem) => (
                <ListCard 
                note={noteItem} 
                onSelect={onSelect}/>
            ))}
        </div>
    )
}


export default NoteList