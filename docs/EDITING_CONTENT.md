# Editing portfolio content

The public portfolio reads its text and links from the JavaScript files in `src/content`. The local editor is a development convenience that helps prepare the same information as JSON; it does not write source files or publish changes.

## Method A — edit the source files

1. Open the appropriate file in `src/content`.
2. Change the placeholder values and save the file.
3. Run `npm run dev` and review the site locally.
4. Run `npm run build` before publishing.
5. Commit and push the reviewed source changes through your normal Git workflow.

Use these files:

- Hero name, headline, introduction, and About Me: `src/content/profile.js`
- Homepage labels, navigation, bookshelf labels, and page headings: `src/content/site.js`
- Project titles, summaries, technologies, images, and links: `src/content/projects.js`
- Education, experience, research, skills, and résumé URL: `src/content/experience.js`
- Email, GitHub, LinkedIn, contact message, and footer links: `src/content/contact.js`

Examples:

```js
// src/content/profile.js
name: 'Your Name',
headline: 'Your professional headline',
aboutIntroduction: 'Your About Me introduction',
```

```js
// src/content/projects.js
{
  title: 'Project title',
  summary: 'A concise explanation of the problem, work, and result.',
  technologies: ['React', 'Python'],
  githubUrl: 'https://github.com/your-name/project',
  projectUrl: 'https://example.com',
}
```

```js
// src/content/experience.js
skills: ['JavaScript', 'Python', 'Embedded systems'],
resumeUrl: '/resume.pdf',
```

```js
// src/content/contact.js
{ label: 'Email', value: 'you@example.com', href: 'mailto:you@example.com' },
{ label: 'GitHub', value: 'github.com/your-name', href: 'https://github.com/your-name' },
{ label: 'LinkedIn', value: 'linkedin.com/in/your-name', href: 'https://linkedin.com/in/your-name' },
```

## Method B — use the local visual editor

1. Run `npm run dev`.
2. Visit `http://localhost:5173/#/editor`.
3. Edit the grouped fields. Draft changes are saved in this browser’s `localStorage`.
4. Use **Export JSON** to download a copy, or **Copy JSON** to place it on the clipboard.
5. Transfer the exported values into the matching files in `src/content`.
6. Run `npm run dev` to review the actual public portfolio, then run `npm run build`.
7. Commit and push the source changes through your normal Git workflow.

The editor only exists while Vite is running in development mode. A production build redirects `/#/editor` to the homepage. There is no backend, repository connection, or automatic publishing. Clearing browser storage removes drafts that have not been exported.
