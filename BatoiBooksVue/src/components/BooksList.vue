<template>
  <div id="BooksList">
    <h2>Lista de Libros</h2>
    <div v-for="book in books" :key="book.id" class="book">
      <BookItem :book="book" @delete="deleteBook" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import BookItem from './BookItem.vue';

export default {
  components: { BookItem },
  data() {
    return {
      books: [],
    };
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await axios.get('http://localhost:3000/books');
        this.books = response.data;
      } catch (error) {
        console.error('Error al obtener los libros:', error);
      }
    },
    async deleteBook(id) {
      if (confirm(`¿Eliminar el libro con ID ${id}?`)) {
        try {
          await axios.delete(`http://localhost:3000/books/${id}`);
          this.fetchBooks();
        } catch (error) {
          console.error('Error al eliminar el libro:', error);
        }
      }
    },
  },
  mounted() {
    this.fetchBooks();
  },
};
</script>