import { useState, useRef, useEffect, useCallback } from 'react'
import { defaultSelectedTags } from '../data/tags.js'
import { venues } from '../data/venues.js'
import { startCaseWords, generateHashtags, generateSemicolonSeparated, generateCommaSeparated } from '../utils/tagUtils.js'
import VenueSelector from './VenueSelector.jsx'
import TagList from './TagList.jsx'
import OutputSection from './OutputSection.jsx'

const TagGenerator = () => {
  const [selectedTags, setSelectedTags] = useState([...defaultSelectedTags])
  const [generatedHashtags, setGeneratedHashtags] = useState('')
  const [generatedSemicolon, setGeneratedSemicolon] = useState('')
  const [generatedComma, setGeneratedComma] = useState('')
  const [bandName, setBandName] = useState('')

  const clickTimeoutRef = useRef(null)
  const draggingRef = useRef(false)

  const handleBandNameChange = (event) => {
    setBandName(event.target.value)
  }

  const handleBandNameKeyDown = (event) => {
    if (event.key === 'Enter' && bandName.trim()) {
      const bandNameStartCase = startCaseWords(bandName.trim())
      const updatedTags = [
        ...selectedTags.filter(
          (tag) => !tag.toLowerCase().includes(bandName.toLowerCase())
        ),
        bandNameStartCase
      ].sort()
      setSelectedTags(updatedTags)
      setBandName('')
    }
  }

  const handleTagClick = useCallback((tag) => {
    if (defaultSelectedTags.includes(tag)) {
      return
    }

    setSelectedTags(prevTags => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag)
      } else {
        const updatedTags = [
          ...prevTags,
          tag.charAt(0).toUpperCase() + tag.slice(1)
        ].sort()
        return [...new Set(updatedTags)]
      }
    })
  }, [])

  const handleVenueSelect = useCallback((venueTags) => {
    setSelectedTags((prevTags) => {
      const filteredPrevTags = prevTags.filter(
        (tag) => !Object.values(venues).flat().includes(tag)
      )
  
      const updatedTags = [
        ...defaultSelectedTags,
        ...filteredPrevTags,
        ...venueTags
      ]
  
      return [...new Set(updatedTags)]
    })
  }, [])

  const clearSelectedTags = () => {
    setSelectedTags([...defaultSelectedTags])
    setBandName('')
  }

  const handleMouseDown = (tag) => {
    clickTimeoutRef.current = setTimeout(() => {
      if (defaultSelectedTags.includes(tag)) {
        return
      }
      setSelectedTags(prev => [...prev, tag])
      draggingRef.current = true
    }, 200)
  }

  const handleMouseUp = () => {
    clearTimeout(clickTimeoutRef.current)
    if (draggingRef.current) {
      draggingRef.current = false
    }
  }

  const handleTagMouseEnter = (tag) => {
    if (draggingRef.current) {
      if (defaultSelectedTags.includes(tag)) {
        return
      }
      setSelectedTags(prevTags => {
        if (prevTags.includes(tag)) {
          return prevTags.filter((t) => t !== tag)
        } else {
          const updatedTags = [...prevTags, tag].sort()
          return updatedTags
        }
      })
    }
  }

  const handleGlobalMouseUp = useCallback(() => {
    if (draggingRef.current) {
      clearTimeout(clickTimeoutRef.current)
      draggingRef.current = false
    }
  }, [])

  useEffect(() => {
    window.addEventListener('mouseup', handleGlobalMouseUp)
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [handleGlobalMouseUp])

  useEffect(() => {
    setGeneratedHashtags(generateHashtags(selectedTags))
    setGeneratedSemicolon(generateSemicolonSeparated(selectedTags))
    setGeneratedComma(generateCommaSeparated(selectedTags))
  }, [selectedTags])

  const hasAdditionalTags = selectedTags.length > defaultSelectedTags.length

  return (
    <div className="tag-generator">
      <h1>Hashtag Generator</h1>

      <VenueSelector onVenueSelect={handleVenueSelect} />
      
      <br />
      
      <input
        type="text"
        value={bandName}
        onChange={handleBandNameChange}
        onKeyDown={handleBandNameKeyDown}
        placeholder="Enter band name"
        className="band-input"
      />

      <TagList
        selectedTags={selectedTags}
        onTagClick={handleTagClick}
        onTagMouseDown={handleMouseDown}
        onTagMouseEnter={handleTagMouseEnter}
        onMouseUp={handleMouseUp}
        defaultSelectedTags={defaultSelectedTags}
      />

      <div className="selected-tags-section">
        <h3>
          Selected Words:{' '}
          <button onClick={clearSelectedTags} className="clear-button">
            Clear Selected Words
          </button>
        </h3>
        {hasAdditionalTags && (
          <div className="selected-tags-display">
            {selectedTags.sort().join(', ')}
          </div>
        )}
        <br />
      </div>

      <hr />

      {hasAdditionalTags && (
        <div className="output-sections">
          {generatedHashtags && (
            <OutputSection
              title="Generated Hashtags (for Instagram)"
              content={generatedHashtags}
            />
          )}
          {generatedSemicolon && (
            <OutputSection
              title="Generated Semicolon (for Archive.org)"
              content={generatedSemicolon}
            />
          )}
          {generatedComma && (
            <OutputSection
              title="Generated Comma (for YouTube)"
              content={generatedComma}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default TagGenerator