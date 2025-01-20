<template>
  <div>
    <book-item
      v-for="book in books"
      :key="book.id"
      :book="book"
    >
    <template #buttons>
      <button
        class="cart add-cart"
        :disabled="isInCart(book.id)"
        @click="addToCart(book)"
      >
        <cart-plus></cart-plus>
      </button>
      <button class="edit" title="Editar" @click="$router.push(`/edit-book/${book.id}`)">
        <pencil></pencil>
      </button>
      <button class="delete" title="Eliminar" @click="remove">
        <delete></delete>
      </button>
    </template> 
    </book-item>
  </div>
  <div>Total de libros: {{ total }}</div>
</template>

<script>
import Delete from 'vue-material-design-icons/Delete.vue'
import CartPlus from 'vue-material-design-icons/CartPlus.vue'
import Pencil from 'vue-material-design-icons/Pencil.vue'
import BookItem from './BookItem.vue'
import { useMainStore } from '../store'

export default {
  components: {
    BookItem,
    Delete,
    CartPlus,
    Pencil,
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
  methods: {
    addToCart(book) {
      const store = useMainStore();
      store.addTocart(book);
    },
    isInCart(bookId) {
      const store = useMainStore();
      return store.cart.some(book => book.id === bookId);
    },
  },
  mounted() {
    const store = useMainStore();
    store.fetchBooks();
  },
}
</script>
