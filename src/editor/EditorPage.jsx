import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { editorDefaults } from '../content/editorDefaults'
import { EditorSection, Field } from './EditorSection'
import { ExperienceEditor, SkillsEditor } from './ExperienceEditor'
import { JsonTools } from './JsonTools'
import { ProjectEditor } from './ProjectEditor'
import './editor.css'

const storageKey = 'jay-portfolio-editor-content-v1'
const cloneDefaults = () => JSON.parse(JSON.stringify(editorDefaults))

function loadContent() {
  try {
    const saved = localStorage.getItem(storageKey)
    return saved ? JSON.parse(saved) : cloneDefaults()
  } catch {
    return cloneDefaults()
  }
}

function validateImport(value) {
  if (!value || typeof value !== 'object') throw new Error('The imported value must be a JSON object.')
  if (!value.profile || !Array.isArray(value.profile.aboutSections)) throw new Error('Missing profile or About Me sections.')
  if (!Array.isArray(value.projects)) throw new Error('Projects must be an array.')
  if (!value.experience || !Array.isArray(value.experience.skills)) throw new Error('Missing experience or skills.')
  if (!value.contact || !Array.isArray(value.contact.links)) throw new Error('Missing contact links.')
}

export default function EditorPage() {
  const [content, setContent] = useState(loadContent)
  useEffect(() => { localStorage.setItem(storageKey, JSON.stringify(content)) }, [content])
  const update = (section, value) => setContent((current) => ({ ...current, [section]: value }))
  const updateProfile = (field, value) => update('profile', { ...content.profile, [field]: value })
  const updateContactLink = (index, field, value) => update('contact', { ...content.contact, links: content.contact.links.map((link, itemIndex) => itemIndex === index ? { ...link, [field]: value } : link) })
  const reset = () => { if (window.confirm('Reset all local editor changes to the source placeholders?')) { localStorage.removeItem(storageKey); setContent(cloneDefaults()) } }
  const importContent = (value) => { validateImport(value); setContent(value) }

  return (
    <main className="editor-page">
      <header className="editor-header"><div><p>Development-only workspace</p><h1>Portfolio Content Editor</h1><span>Changes saved here only persist in this browser. Export the content and update the source content files before deploying.</span></div><NavLink to="/">Return to portfolio</NavLink></header>
      <aside className="editor-info"><h2>Publishing workflow</h2><ol><li>Edit the content.</li><li>Export the JSON.</li><li>Copy the values into <code>src/content</code> files.</li><li>Run <code>npm run dev</code> to review.</li><li>Commit and push to publish.</li></ol></aside>
      <div className="editor-layout"><div className="editor-form">
        <EditorSection title="Profile & hero" description="The primary identity and introduction shown on the homepage."><div className="editor-grid two"><Field label="Name" value={content.profile.name} onChange={(value) => updateProfile('name', value)} /><Field label="Headline" value={content.profile.headline} onChange={(value) => updateProfile('headline', value)} /></div><Field label="Short introduction" multiline value={content.profile.introduction} onChange={(value) => updateProfile('introduction', value)} /></EditorSection>
        <EditorSection title="About Me" description="Introductory copy and the cards shown in Volume I."><Field label="About introduction" multiline value={content.profile.aboutIntroduction} onChange={(value) => updateProfile('aboutIntroduction', value)} />{content.profile.aboutSections.map((section, index) => <fieldset className="editor-card" key={`about-${index}`}><legend>About section {index + 1}</legend><Field label="Title" value={section.title} onChange={(value) => updateProfile('aboutSections', content.profile.aboutSections.map((item, itemIndex) => itemIndex === index ? { ...item, title: value } : item))} /><Field label="Paragraph" multiline value={section.body} onChange={(value) => updateProfile('aboutSections', content.profile.aboutSections.map((item, itemIndex) => itemIndex === index ? { ...item, body: value } : item))} /></fieldset>)}</EditorSection>
        <EditorSection title="Projects" description="Add, remove, and revise portfolio projects."><ProjectEditor projects={content.projects} onChange={(value) => update('projects', value)} /></EditorSection>
        <EditorSection title="Education & experience"><ExperienceEditor experience={content.experience} onChange={(value) => update('experience', value)} /></EditorSection>
        <EditorSection title="Skills"><SkillsEditor skills={content.experience.skills} onChange={(skills) => update('experience', { ...content.experience, skills })} /></EditorSection>
        <EditorSection title="Contact links"><Field label="Contact message" multiline value={content.contact.message} onChange={(value) => update('contact', { ...content.contact, message: value })} />{content.contact.links.map((link, index) => <fieldset className="editor-card" key={`contact-${index}`}><legend>{link.label}</legend><div className="editor-grid two"><Field label="Displayed value" value={link.value} onChange={(value) => updateContactLink(index, 'value', value)} /><Field label="Link URL" value={link.href} onChange={(value) => updateContactLink(index, 'href', value)} /></div></fieldset>)}</EditorSection>
        <EditorSection title="JSON tools" description="Export a portable copy or import a previously exported file’s contents."><JsonTools content={content} onImport={importContent} /><button className="editor-button danger reset" type="button" onClick={reset}>Reset local changes</button></EditorSection>
      </div><aside className="editor-preview" aria-label="Live content preview"><p>Live preview</p><div><span>{content.profile.headline}</span><h2>{content.profile.name}</h2><p>{content.profile.introduction}</p><ul>{content.experience.skills.filter(Boolean).slice(0, 6).map((skill, index) => <li key={`${skill}-${index}`}>{skill}</li>)}</ul></div><small>This preview reflects local editor state. The public portfolio continues to read from source files.</small></aside></div>
    </main>
  )
}
