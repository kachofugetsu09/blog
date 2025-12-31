---
layout: home

hero:
  name: "艺术的光辉的博客"
  text: Yishu's Blog
  tagline: "Wir müssen wissen. Wir werden wissen"
  actions:
    - theme: brand
      text: Notes
      link: /notes/introduction
    - theme: alt
      text: Books
      link: /books/index
    - theme: alt
      text: About
      link: /about
---

<script setup>
import { data as books } from './.vitepress/data/books.data.js'
import { data as notes } from './.vitepress/data/notes.data.js'

const latestNotes = notes.slice(0, 3)
const latestBooks = books.slice(0, 3)
</script>

<div class="home-panels">
  <div class="panel">
    <p class="eyebrow">Notes</p>
    <h3>Recent Updated Notes</h3>
    <ul class="feature-list">
      <li v-for="note in latestNotes" :key="note.url">
        <a class="item-card" :href="note.url">
          <span class="item-title">{{ note.title }}</span>
          <span class="item-date" v-if="note.date">Update {{ note.date }}</span>
        </a>
      </li>
      <li v-if="!latestNotes.length" class="item-card empty">No recent updates</li>
    </ul>
    <div class="panel-actions">
      <a class="pill ghost" href="/notes/introduction">All Notes</a>
    </div>
  </div>
  <div class="panel">
    <p class="eyebrow">Books</p>
    <h3>Recent Updated Book Reviews</h3>
    <ul class="feature-list">
      <li v-for="book in latestBooks" :key="book.url">
        <a class="item-card" :href="book.url">
          <span class="item-title">{{ book.title }}</span>
          <span class="item-date" v-if="book.date">Update {{ book.date }}</span>
        </a>
      </li>
      <li v-if="!latestBooks.length" class="item-card empty">No Recent Updates</li>
    </ul>
    <div class="panel-actions">
      <a class="pill ghost" href="/books/index">All Book Reviews</a>
    </div>
  </div>
  <div class="panel">
    <p class="eyebrow">About</p>
    <h3>About</h3>
    <p class="muted">What is this blog for?</p>
    <div class="panel-actions">
      <a class="pill ghost" href="/about">Check About</a>
    </div>
  </div>
</div>
