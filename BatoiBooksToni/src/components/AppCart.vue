<template>
  <div>
    <h2>Libros en el carrito</h2>
    <div>
      <book-item
        v-for="book in cartBooks"
        :key="book.id"
        :book="book"
      >
        <template #buttons>
          <button
            class="cart remove-cart"
            @click="removeFromCart(book.id)"
            title="Eliminar del carrito"
          >
            <cart-off></cart-off>
          </button>
        </template>
      </book-item>
    </div>
    <div>
      <p>Total de libros en el carrito: {{ totalBooks }}</p>
      <p>Total a pagar: {{ totalPrice }} €</p>
      <button @click="clearCart">Vaciar carrito</button>
      <button @click="checkout">Realizar compra</button>
    </div>
  </div>
</template>

<script>
import CartOff from 'vue-material-design-icons/CartOff.vue'
import BookItem from './BookItem.vue'
import { useMainStore } from '../store'


export default {
  components: {
    BookItem,
    CartOff
  },
  computed: {
    cartBooks: {
      get() {
        const store = useMainStore();
        return store.cart;
      }
    },
    totalBooks: {
      get() {
        return this.cartBooks.length;
      }
    },
    totalPrice: {
      get() {
        return this.cartBooks.reduce((sum, book) => sum + book.price, 0);
      }
    }
  },
  methods: {
    removeFromCart(id) {
      const store = useMainStore();
      store.removeToCart(id);
    },
    clearCart() {
      const store = useMainStore();
      store.clearCart();
    },
    checkout() {
      alert('Compra realizada con éxito');
      this.clearCart();
    }
  }
}
</script>
