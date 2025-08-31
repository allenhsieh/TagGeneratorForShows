import { useClipboard } from '../hooks/useClipboard.js'

const OutputSection = ({ title, content }) => {
  const { copyToClipboard, copied } = useClipboard()

  const handleCopy = () => {
    copyToClipboard(content)
  }

  return (
    <div className="output-section">
      <h3>{title}:</h3>
      <div className="output-content">{content}</div>
      <br />
      <button onClick={handleCopy} className="copy-button">
        {copied ? 'Copied!' : 'Copy to Clipboard'}
      </button>
    </div>
  )
}

export default OutputSection