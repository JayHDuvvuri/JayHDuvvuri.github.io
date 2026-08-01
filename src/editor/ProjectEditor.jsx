import { Field } from './EditorSection'

const blankProject = () => ({ title: '', summary: '', technologies: [], image: '', projectUrl: '', githubUrl: '', featured: false })

export function ProjectEditor({ projects, onChange }) {
  const update = (index, field, value) => onChange(projects.map((project, itemIndex) => itemIndex === index ? { ...project, [field]: value } : project))
  const remove = (index) => onChange(projects.filter((_, itemIndex) => itemIndex !== index))

  return (
    <div className="editor-stack">
      {projects.map((project, index) => (
        <fieldset className="editor-card" key={`${index}-${project.title}`}>
          <legend>Project {index + 1}</legend>
          <div className="editor-grid two">
            <Field label="Project title" value={project.title} onChange={(value) => update(index, 'title', value)} />
            <Field label="Image placeholder or URL" value={project.image} onChange={(value) => update(index, 'image', value)} />
          </div>
          <Field label="Summary" multiline value={project.summary} onChange={(value) => update(index, 'summary', value)} />
          <Field label="Technologies (comma separated)" value={project.technologies.join(', ')} onChange={(value) => update(index, 'technologies', value.split(',').map((item) => item.trim()).filter(Boolean))} />
          <div className="editor-grid two">
            <Field label="Project URL" type="url" value={project.projectUrl} onChange={(value) => update(index, 'projectUrl', value)} />
            <Field label="GitHub URL" type="url" value={project.githubUrl} onChange={(value) => update(index, 'githubUrl', value)} />
          </div>
          <label className="editor-check"><input type="checkbox" checked={project.featured} onChange={(event) => update(index, 'featured', event.target.checked)} /> Featured project</label>
          <button className="editor-button danger" type="button" onClick={() => remove(index)}>Remove project</button>
        </fieldset>
      ))}
      <button className="editor-button secondary" type="button" onClick={() => onChange([...projects, blankProject()])}>Add project</button>
    </div>
  )
}
