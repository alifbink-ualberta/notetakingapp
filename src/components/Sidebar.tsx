import { Note } from "./types";
import tagIcon from "../assets/tag-icon.svg";
type SidebarProps = {
  notes: Note[];
  activeTag: string | null;
  onTagSelect: (tag: string) => void;
  onClearFilter: () => void;
};

function Sidebar({ notes, activeTag, onTagSelect, onClearFilter }: SidebarProps) {
  // Collect all unique tags from saved notes
  const uniqueTags = Array.from(new Set(notes.flatMap((note) => note.tags))); // flatMap to get all tags from notes, then Set to get unique tags

  return (
    <aside className="sidebar">

      <button className="clear-filter" onClick={onClearFilter}>Show All Notes</button>

      <h3 id="tags-title">Tags</h3>

      <div className="tags-list">
        {uniqueTags.length === 0 ? (
          <p>No tags yet</p>
        ) : (
          uniqueTags.map((tag) => (
            <div
              key={tag}
              className={`tag-btn${activeTag === tag ? " active-tag" : ""}`}
              onClick={() => onTagSelect(tag)}
            >
              <img className="tag-icon" src={tagIcon} />
              <span>{tag}</span>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}

export default Sidebar;