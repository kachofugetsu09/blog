---
layout: page
title: Bookshelf
---

<script setup>
import { data as books } from '../.vitepress/data/books.data.js'

const totalBooks = books.length
const latestDate = books[0]?.date || ''
</script>

<section class="books-hero">
  <p class="eyebrow">Bookshelf</p>
  <h1>Book reviews</h1>
  <p class="muted">Finishing a book with little thoughts</p>
  <div class="books-meta">
    <span class="chip">Reviewed: {{ totalBooks }} </span>
    <span class="chip ghost" v-if="latestDate">Recent Updated {{ latestDate }}</span>
  </div>
</section>

<section class="books-grid" v-if="books.length">
  <article class="book-card" v-for="book in books" :key="book.url">
    <div class="book-card__meta">
      <span class="chip">{{ book.tag }}</span>
      <span class="chip ghost" v-if="book.date">{{ book.date }}</span>
    </div>
    <h3><a :href="book.url">{{ book.title }}</a></h3>
    <p class="muted">Author：{{ book.author }}</p>
    <a class="text-link" :href="book.url">Check →</a>
  </article>
</section>

<p class="muted" style="text-align:center;margin-top:2rem;" v-else>📖 暂无书摘，读书中…</p>
