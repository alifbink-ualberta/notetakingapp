import { Note } from "./types";

type SidebarProps = {
  notes: Note[];
  activeTag: string | null;
  onTagSelect: (tag: string) => void;
  onClearFilter: () => void;
};

function Sidebar({ notes, activeTag, onTagSelect, onClearFilter }: SidebarProps) {
  // Collect all unique tags from saved notes
  const uniqueTags = Array.from(new Set(notes.flatMap((note) => note.tags)));

  return (
    <aside className="sidebar">
      <h3>Tags</h3>
      <div className="tags-list">
        {uniqueTags.length === 0 ? (
          <p>No tags yet</p>
        ) : (
          uniqueTags.map((tag) => (
            <button
              key={tag}
              className={`tag-btn ${activeTag === tag ? "active" : ""}`}
              onClick={() => onTagSelect(tag)}
            >
              {tag}
            </button>
          ))
        )}
      </div>
      {activeTag && (
        <button className="clear-filter" onClick={onClearFilter}>
          Show All Notes
        </button>
      )}
    </aside>
  );
}

export default Sidebar;
