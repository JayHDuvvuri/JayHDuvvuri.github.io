export function EditorSection({ title, description, children }) {
  return (
    <section className="editor-section">
      <header><h2>{title}</h2>{description && <p>{description}</p>}</header>
      <div className="editor-section-body">{children}</div>
    </section>
  )
}

export function Field({ label, value, onChange, multiline = false, type = 'text', placeholder = '' }) {
  const Input = multiline ? 'textarea' : 'input'
  return (
    <label className="editor-field">
      <span>{label}</span>
      <Input type={multiline ? undefined : type} rows={multiline ? 4 : undefined} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}
