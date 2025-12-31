import { createContentLoader } from 'vitepress'

export default createContentLoader('books/**/*.md', {
  excerpt: false,
  transform(raw) {
    return raw
      .filter((book) => book.url !== '/books/') // 排除 index.md 本身
      .map((book) => {
        const frontmatter = book.frontmatter || {}

        return {
          title: frontmatter.title || book.url.replace(/^.*\//, '').replace(/\/$/, ''),
          author: frontmatter.author || 'Unknown',
          tag: frontmatter.tag || 'Unknown',
          date: formatDate(frontmatter.date),
          url: book.url,
        }
      })
      .sort((a, b) => {
        if (a.date === b.date) return 0
        if (!a.date) return 1
        if (!b.date) return -1
        return b.date.localeCompare(a.date)
      })
  },
})

function formatDate(input) {
  if (!input) return ''
  if (input instanceof Date) return input.toISOString().slice(0, 10)
  if (typeof input === 'string') return input.slice(0, 10)
  return String(input).slice(0, 10)
}
