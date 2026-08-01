import { useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { HashRouter, Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import Bookshelf from './components/Bookshelf'
import LibraryDoors from './components/LibraryDoors'
import LibraryScene from './components/LibraryScene'
import { contact } from './content/contact'
import { experience } from './content/experience'
import { profile } from './content/profile'
import { projects } from './content/projects'
import { site } from './content/site'
import EditorPage from './editor/EditorPage'
import './App.css'

const pageMotion = { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 } }

function Mark() {
  return <NavLink to="/" className="mark" aria-label={`${profile.name} home`}><span>JD</span><small>{site.archiveLabel}</small></NavLink>
}

function Header() {
  return <header className="site-header"><Mark /><nav aria-label="Primary navigation">{site.navigation.map((item) => <NavLink key={item.label} to={item.path}>{item.label}</NavLink>)}</nav><NavLink to="/contact" className="header-cta">{site.headerCta} <span aria-hidden="true">↗</span></NavLink></header>
}

function Footer() {
  return <footer><span>{site.footerCopyrightPrefix} {new Date().getFullYear()} {profile.name}</span><div>{contact.footerLinks.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}</div><span>{site.footerSignoff}</span></footer>
}

function Home() {
  const reduced = useReducedMotion()
  return <main className="home"><LibraryDoors /><LibraryScene /><div className="dust" aria-hidden="true" /><motion.section className="hero-copy" initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}><p className="eyebrow"><span /> {site.heroEyebrow} <span /></p><h1>{profile.name}</h1><h2>{profile.headline}</h2><p className="focus">{site.heroFocus}</p><p className="intro">{profile.introduction}</p></motion.section><Bookshelf books={site.books} label={site.shelfLabel} hint={site.shelfHint} /><p className="scroll-cue">{site.scrollLabel} <span /></p></main>
}

function PageShell({ eyebrow, title, lede, children }) {
  return <motion.main className="inner-page" {...pageMotion} transition={{ duration: .38 }}><header className="page-heading"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{lede}</p></header>{children}</motion.main>
}

function About() {
  return <PageShell eyebrow={site.pages.about.eyebrow} title={site.pages.about.title} lede={profile.aboutIntroduction}><div className="about-grid">{profile.aboutSections.map((section, i) => <motion.article className="folio-card" key={section.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .05 }}><span>{String(i + 1).padStart(2, '0')}</span><h2>{section.title}</h2><p>{section.body}</p><small>{site.pages.about.placeholderLabel}</small></motion.article>)}</div></PageShell>
}

function Projects() {
  return <PageShell eyebrow={site.pages.projects.eyebrow} title={site.pages.projects.title} lede={site.pages.projects.lede}><div className="project-grid">{projects.map((project, i) => <motion.article className="project-card" key={project.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .08 }} whileHover={{ y: -5 }}><div className="project-number">0{i + 1}<span>{site.pages.projects.fileLabel}</span></div><h2>{project.title}</h2><p>{project.summary}</p><div className="tags">{project.technologies.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="card-actions"><a href={project.projectUrl}>{site.pages.projects.viewLabel} <span>↗</span></a><a href={project.githubUrl}>{site.pages.projects.githubLabel}</a></div></motion.article>)}</div></PageShell>
}

function Resume() {
  const sections = [{ title: 'Education', entries: experience.education }, { title: 'Experience', entries: experience.employment }, { title: 'Research', entries: experience.research }, { title: 'Skills', entries: [{ heading: '[Technical Skills]', body: experience.skills.join(' · ') }] }]
  return <PageShell eyebrow={site.pages.resume.eyebrow} title={site.pages.resume.title} lede={site.pages.resume.lede}><div className="resume-actions"><a className="gold-button" href={experience.resumeUrl}>{site.pages.resume.downloadLabel} <span>↓</span></a><small>{site.pages.resume.placeholderNote}</small></div><div className="document">{sections.map((section) => <section key={section.title}><h2>{section.title}</h2><div>{section.entries.map((entry, index) => <div className="document-entry" key={`${section.title}-${index}`}><h3>{entry.heading}</h3><p>{entry.body}</p></div>)}</div></section>)}</div></PageShell>
}

function Contact() {
  return <PageShell eyebrow={contact.eyebrow} title={contact.title} lede={contact.message}><div className="contact-layout"><aside className="contact-details"><h2>{contact.sectionTitle}</h2>{contact.links.map((link) => <a href={link.href} key={link.label}><span>{link.label}</span>{link.value}<b>↗</b></a>)}</aside><form className="contact-form" onSubmit={(event) => event.preventDefault()}><p>{contact.form.notice}</p><label>{contact.form.nameLabel}<input placeholder={contact.form.namePlaceholder} /></label><label>{contact.form.emailLabel}<input type="email" placeholder={contact.form.emailPlaceholder} /></label><label>{contact.form.messageLabel}<textarea rows="5" placeholder={contact.form.messagePlaceholder} /></label><button type="submit" aria-disabled="true">{contact.form.submitLabel} <span>↗</span></button></form></div></PageShell>
}

function PublicSite({ location }) {
  return <div className="app"><Header /><AnimatePresence mode="wait"><Routes location={location} key={location.pathname}><Route path="/" element={<Home />} /><Route path="/about" element={<About />} /><Route path="/projects" element={<Projects />} /><Route path="/resume" element={<Resume />} /><Route path="/contact" element={<Contact />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></AnimatePresence><Footer /></div>
}

function AppRoutes() {
  const location = useLocation()
  useEffect(() => { document.title = site.browserTitle }, [])
  if (location.pathname === '/editor') return <Routes><Route path="/editor" element={import.meta.env.DEV ? <EditorPage /> : <Navigate to="/" replace />} /></Routes>
  return <PublicSite location={location} />
}

export default function App() { return <HashRouter><AppRoutes /></HashRouter> }
