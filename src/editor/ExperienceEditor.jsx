import { Field } from './EditorSection'

function EntryList({ label, entries, onChange }) {
  const update = (index, field, value) => onChange(entries.map((entry, itemIndex) => itemIndex === index ? { ...entry, [field]: value } : entry))
  return (
    <div className="editor-stack compact">
      <h3>{label}</h3>
      {entries.map((entry, index) => <fieldset className="editor-card" key={`${label}-${index}`}><legend>{label} {index + 1}</legend><Field label="Heading" value={entry.heading} onChange={(value) => update(index, 'heading', value)} /><Field label="Details" multiline value={entry.body} onChange={(value) => update(index, 'body', value)} /><button className="editor-button danger" type="button" onClick={() => onChange(entries.filter((_, itemIndex) => itemIndex !== index))}>Remove entry</button></fieldset>)}
      <button className="editor-button secondary" type="button" onClick={() => onChange([...entries, { heading: '', body: '' }])}>Add {label.toLowerCase()} entry</button>
    </div>
  )
}

export function ExperienceEditor({ experience, onChange }) {
  const set = (field, value) => onChange({ ...experience, [field]: value })
  return <div className="editor-stack"><EntryList label="Education" entries={experience.education} onChange={(value) => set('education', value)} /><EntryList label="Experience" entries={experience.employment} onChange={(value) => set('employment', value)} /><EntryList label="Research" entries={experience.research} onChange={(value) => set('research', value)} /><Field label="Resume URL" type="url" value={experience.resumeUrl} onChange={(value) => set('resumeUrl', value)} /></div>
}

export function SkillsEditor({ skills, onChange }) {
  return <div className="editor-stack compact">{skills.map((skill, index) => <div className="inline-field" key={`skill-${index}`}><Field label={`Skill ${index + 1}`} value={skill} onChange={(value) => onChange(skills.map((item, itemIndex) => itemIndex === index ? value : item))} /><button className="editor-button danger icon" type="button" aria-label={`Remove skill ${index + 1}`} onClick={() => onChange(skills.filter((_, itemIndex) => itemIndex !== index))}>×</button></div>)}<button className="editor-button secondary" type="button" onClick={() => onChange([...skills, ''])}>Add skill</button></div>
}
