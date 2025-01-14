<template>
  <div>
    <book-item
      v-for="(book, index) in books"
      :key="book.id"
      :book="book"
      @remove="delBook(book.id, index)"
    ></book-item>
  </div>
  <div>Total de libros: {{ total }}</div>
</template>

<script>
import BookItem from './BookItem.vue'
import BooksRepository from '../repositories/books.repository'
import { store } from '../store'

export default {
  components: {
    BookItem
  },
  data() {
    return {
      books: [],
      repository: new BooksRepository()
    }
  },
  created() {
    this.getBooks()
  },
  computed: {
    total: {
      get() {
        return this.books.length;
      }
    }
  },
  methods: {
    async getBooks() {
      try {
        const response = await this.repository.getAllBooks()
        this.books = response
      } catch (error) {
        console.error(error.message)
        store.setMessageAction(error.message)
      }
    },
    async delBook(id, index) {
      try {
        await this.repository.removeBook(id)
        this.books.splice(index, 1)
      } catch (error) {
        store.setMessageAction(error.message)
      }
    }
  }
}
</script>
