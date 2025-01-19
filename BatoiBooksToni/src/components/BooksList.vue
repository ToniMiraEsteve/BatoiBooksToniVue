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
import { useMainStore } from '../store'

export default {
  components: {
    BookItem
  },
  computed: {
    books: {
      get() {
        return useMainStore().books;
      }
    },
    total: {
      get() {
        return this.books.length;
      }
    }
  },
  mounted() {
    const store = useMainStore();
    store.fetchBooks();
  },
}
</script>
