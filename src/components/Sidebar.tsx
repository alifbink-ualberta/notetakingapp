import { Note } from "./types";
import TagIcon from "./icons/TagIcon";
import HomeIcon from "./icons/HomeIcon";

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
      
      <div className="show-all-tags">
        
        <button className="clear-filter" onClick={onClearFilter}><HomeIcon size={16} color="white" className="tag-icon"/>Show All Notes</button>
      </div>

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
              <TagIcon size={16} color="white" className="tag-icon"/>
              <span>{tag}</span>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}

export default Sidebar;