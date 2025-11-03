import { Note } from "./types"
import TagIcon from "./icons/TagIcon"
import ClockIcon from "./icons/ClockIcon"

type NoteProps = {
  note: Note | null
  onUpdate: (updatedNote: Note) => void
}


function NoteView({ note, onUpdate }: NoteProps) {
  if (!note) {
    return <div className="note-empty"></div>
  }

  return (
    <form className="note">
      <input
        type="text"
        value={note.title}
        onChange={(e) => onUpdate({ ...note, title: e.target.value })}
        className="title note-title"
        placeholder="Enter a title..."
      />
      <div>
        <span className="tag-noteview"> <TagIcon className="view-icon"/> <span className="text-noteview">Tags</span></span>
        <input
          type="text"
          value={note.tags.join(",")}
          onChange={(e) => onUpdate({ ...note, 
            tags: e.target.value.split(",").map(tag => tag.trim())})}
          placeholder="Add tags separated by commas (e.g., Work, Personal)"
        />
      </div>
      <div className="last-edited noteview">
        <ClockIcon className="view-icon"/> <span className="text-noteview"> Last Edited {note.updatedAt.toLocaleString()}</span>
      </div>

      <textarea
        value={note.content}
        onChange={(e) => onUpdate({ ...note, content: e.target.value })}
        placeholder="Start typing your note here..."
      />
      
    </form>
  )
}

export default NoteView

  