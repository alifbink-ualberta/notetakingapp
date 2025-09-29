import { Note } from "./types"

type ListCardProps = {
  note: Note
  onSelect: (id: string) => void
}

function ListCard({note, onSelect} : ListCardProps){
    return(
        <div 
        className="list-card" 
        onClick={() => onSelect(note.id)} // click to select this note
        >
            <h3 className="title">{note.title}</h3>
            <div className="tags">
                {note.tags.length > 0 ? (
                    note.tags.map((tag) => (
                        <span key={tag} className="tag">
                            {tag}
                        </span>
                    ))
                ) : (
                    <></>
                )}
            </div>
            <div className="last-edited">
                Last edited: {note.updatedAt.toLocaleString()}
            </div>

        </div>
    )
}

export default ListCard