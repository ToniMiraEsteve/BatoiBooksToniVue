<template>
  <div class="card">
    <img :src="book.photo" :alt="'Libro: ' + book.id" />
    <div>
      <h5>{{ book.idModule + ' (' + book.id + ')' }}</h5>
      <h6>{{ book.publisher }}</h6>
      <p>Precio: {{ book.price  }} €</p>
      <p>Páginas: {{ book.pages }}</p>
      <p>Estado: {{ book.status }}</p>
      <p>{{ book.soldDate ? 'Vendido el ' + book.soldDate : 'En venta' }}</p>
      <p>Comentarios: {{ book.comments || '' }}</p>
    </div>
    <div>
      <button class="cart add-cart" title="Añadir al carrito">
        <cart-plus></cart-plus>
      </button>
      <button class="edit" title="Editar">
        <pencil></pencil>
      </button>
      <button class="delete" title="Eliminar" @click="remove">
        <delete></delete>
      </button>
    </div>
  </div>
</template>

<script>
import Delete from 'vue-material-design-icons/Delete.vue'
import CartPlus from 'vue-material-design-icons/CartPlus.vue'
import Pencil from 'vue-material-design-icons/Pencil.vue'

export default {
  components: {
    Delete,
    CartPlus,
    Pencil,
  },
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  methods: {
    remove() {
      if (
        confirm(
          'Vas a borrar el libro con id ' +
            this.book.id +
            ' del módulo "' +
            this.book.idModule +
            '"'
        )
      ) {
        this.$emit('remove')
      }
    }
  }
}
</script>

<style scoped>
.card {
  margin: 1em;
  background-color: beige;
}
</style>
