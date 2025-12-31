import { createContentLoader } from 'vitepress'
import fs from 'fs'
import path from 'path'

const docsRoot = path.resolve(__dirname, '..', '..')

function resolveFilePath(noteUrl) {
  const relative = decodeURIComponent(noteUrl).replace(/^\//, '')
  return path.join(docsRoot, `${relative}.md`)
}

export default createContentLoader('notes/**/*.md', {
  excerpt: false,
  transform(raw) {
    return raw
      .filter((note) => note.url !== '/notes/')
      .map((note) => {
        const frontmatter = note.frontmatter || {}
        const title = frontmatter.title || note.url.split('/').filter(Boolean).pop() || 'Untitled'

        const updated = getFileDate(note.url)
        return {
          title,
          date: formatDate(frontmatter.date) || updated,
          url: note.url
        }
      })
      .sort((a, b) => {
        if (a.date === b.date) return a.title.localeCompare(b.title)
        if (!a.date) return 1
        if (!b.date) return -1
        return b.date.localeCompare(a.date)
      })
  }
})

function formatDate(input) {
  if (!input) return ''
  if (input instanceof Date) return input.toISOString().slice(0, 10)
  if (typeof input === 'string') return input.slice(0, 10)
  return String(input).slice(0, 10)
}

function getFileDate(noteUrl) {
  try {
    const filePath = resolveFilePath(noteUrl)
    const stat = fs.statSync(filePath)
    return stat.mtime.toISOString().slice(0, 10)
  } catch {
    return ''
  }
}
