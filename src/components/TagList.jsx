import { musicGenreTags } from '../data/tags.js'

const TagList = ({ 
  selectedTags, 
  onTagClick, 
  onTagMouseDown, 
  onTagMouseEnter, 
  onMouseUp,
  defaultSelectedTags 
}) => {
  return (
    <div onMouseUp={onMouseUp}>
      <h3>Words</h3>
      <ul className="tag-list">
        {musicGenreTags.map((tag) => (
          <li
            key={tag}
            onClick={() => onTagClick(tag)}
            onMouseDown={() => onTagMouseDown(tag)}
            onMouseEnter={() => onTagMouseEnter(tag)}
            className={`tag-item ${selectedTags.includes(tag) ? 'selected' : ''} ${
              defaultSelectedTags.includes(tag) ? 'default' : ''
            }`}
          >
            {tag}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TagList