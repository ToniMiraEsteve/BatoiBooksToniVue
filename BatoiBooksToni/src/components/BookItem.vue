<template>
  <div class="card">
    <img :src="book.photo" :alt="'Libro: ' + book.id" />
    <div>
      <h5>{{ modulesCodeCliteral + ' (' + book.id + ')' }}</h5>
      <h6>{{ book.publisher }}</h6>
      <p>Precio: {{ book.price  }} €</p>
      <p>Páginas: {{ book.pages }}</p>
      <p>Estado: {{ book.status }}</p>
      <p>{{ book.soldDate ? 'Vendido el ' + book.soldDate : 'En venta' }}</p>
      <p>Comentarios: {{ book.comments || '' }}</p>
    </div>
    <div>
      <slot name="buttons"></slot>
    </div>
  </div>
</template>

<script>
import { useMainStore } from '../store'  
import { mapActions } from 'pinia'



export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  computed: {
    modulesCodeCliteral(){ 
      const modules = useMainStore().getModulesCliteral;
      const modulo = modules.find(module => module.code === this.book.idModule);     
      return modulo ? modulo.cliteral : 'Módulo no encontrado';
    }
  },
  async created(){
      await this.fetchModules()
  },
  methods: {
    ...mapActions(useMainStore , ['fetchModules']), 
    async remove() {
      const store = useMainStore();
      if (
        confirm(
          'Vas a borrar el libro con id ' +
            this.book.id +
            ' del módulo "' +
            this.book.idModule +
            '"'
        )
      ) {
        await store.removeBook(this.book.id);
      }
    },
  }
}
</script>

<style scoped>
.card {
  margin: 1em;
  background-color: beige;
}
</style>
