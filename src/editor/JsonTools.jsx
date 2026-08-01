import { useState } from 'react'

export function JsonTools({ content, onImport }) {
  const [jsonText, setJsonText] = useState('')
  const [status, setStatus] = useState('')
  const serialized = JSON.stringify(content, null, 2)

  const exportJson = () => {
    const url = URL.createObjectURL(new Blob([serialized], { type: 'application/json' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'portfolio-content.json'
    link.click()
    URL.revokeObjectURL(url)
    setStatus('JSON file exported.')
  }

  const copyJson = async () => {
    await navigator.clipboard.writeText(serialized)
    setStatus('JSON copied to the clipboard.')
  }

  const importJson = () => {
    try {
      const parsed = JSON.parse(jsonText)
      onImport(parsed)
      setStatus('JSON imported into the local editor.')
    } catch (error) {
      setStatus(`Import failed: ${error.message}`)
    }
  }

  return <div className="json-tools"><div className="editor-actions"><button className="editor-button primary" type="button" onClick={exportJson}>Export JSON</button><button className="editor-button secondary" type="button" onClick={copyJson}>Copy JSON</button></div><label className="editor-field"><span>Import JSON</span><textarea rows="10" value={jsonText} onChange={(event) => setJsonText(event.target.value)} placeholder="Paste previously exported portfolio JSON here." /></label><button className="editor-button secondary" type="button" onClick={importJson}>Import pasted JSON</button><p className="editor-status" role="status" aria-live="polite">{status}</p></div>
}
