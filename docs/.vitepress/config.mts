
import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

type SidebarItem = {
  text: string
  link?: string
  collapsible?: boolean
  collapsed?: boolean
  items?: SidebarItem[]
}

function getSidebarItems(dir: string, basePath: string = '/notes'): SidebarItem[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const items: SidebarItem[] = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      const children = getSidebarItems(fullPath, path.posix.join(basePath, entry.name))
      if (children.length > 0) {
        items.push({
          text: entry.name,
          collapsible: true,
          collapsed: true, // ✅ 默认折叠
          items: children
        })
      }
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const name = entry.name.replace(/\.md$/, '')
      if (name.toLowerCase() !== 'readme') {
        items.push({
          text: name,
          link: path.posix.join(basePath, name)
        })
      }
    }
  }

  return items
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Yishu's blog",
  description: "A personal blog",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Notes', link: '/notes/introduction' },
      { text: 'Books', link: '/books/index' }
    ],

    sidebar: {
      '/notes/': getSidebarItems(path.resolve(__dirname, '../notes'))
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yukunliu110100001111' }
    ],
    outline: {
      label: '目录' // 改成你想显示的文案
    }
  }
})
