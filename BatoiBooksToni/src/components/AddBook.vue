<template>
  <div>
    <form @submit.prevent="handleSubmit" novalidate>
      <legend>{{ isEditing ? 'Editar libro' : 'Añadir libro' }}</legend>
      <div>
        <label>Id:</label>
        <input type="text" v-model="book.id" :disabled="isEditing" /><br />
        <span class="error"></span>
      </div>
      <div>
        <label>Módulo:</label>
        <select v-model="book.idModule" required>
          <option value="" disabled>- Selecciona un módulo -</option>
          <option v-for="module in modules" :key="module.code" :value="module.code">
            {{ module.cliteral }}
          </option>
        </select><br />
        <span class="error"></span>
      </div>
      <div>
        <label>Editorial:</label>
        <input type="text" v-model="book.publisher" required /><br />
        <span class="error"></span>
      </div>
      <div>
        <label>Precio:</label>
        <input type="number" v-model="book.price" required min="0" step="0.01" /><br />
        <span class="error"></span>
      </div>
      <div>
        <label>Páginas:</label>
        <input type="number" v-model="book.pages" required min="0" /><br />
        <span class="error"></span>
      </div>
      <div>
        <label>Estado:</label>
        <div>
          <label><input type="radio" name="status" v-model="book.status" value="Nuevo" required />Nuevo</label>
        </div>
        <div>
          <label><input type="radio" name="status" v-model="book.status" value="Bueno" />Bueno</label>
        </div>
        <div>
          <label><input type="radio" name="status" v-model="book.status" value="Usado" />Usado</label>
        </div>
        <div>
          <label><input type="radio" name="status" v-model="book.status" value="Malo" />Malo</label>
        </div>
        <span class="error"></span>
      </div>

      <div>
        <label>Comentarios:</label>
        <textarea v-model="book.comments"></textarea>
        <span class="error"></span>
      </div>
      <button type="submit">{{ isEditing ? 'Guardar cambios' : 'Añadir' }}</button>
      <button type="reset" @click="handleReset">{{ isEditing ? 'Reiniciar cambios' : 'Resetear' }}</button>
    </form>
  </div>
</template>


<script>
import { mapActions } from 'pinia'
import { useMainStore } from '../store'

export default {
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      book: {
        idModule: "",
        publisher: "",
        price: null,
        pages: null,
        status: "new",
        comments: "",
      },
      isEditing: false,
    }
  },
  computed: {
    modules() {
      return useMainStore().modules;
    },
  },
  mounted() {
    const store = useMainStore();
    this.isEditing = !!this.id;
    store.fetchModules();
    if (this.isEditing) {
      const books = store.books.find(book => book.id === this.id);
      if (books) {
        this.book = { ...books };
      }
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const store = useMainStore();
        if (this.isEditing) {
          await store.updateBook(this.book.id,this.book);
        } else {
          await store.addBook(this.book);
        }
        this.$router.push('/');
      } catch (error) {
        const store = useMainStore();
        store.addMessage(error.message);
      }
    },
    async handleReset() {
      if (this.isEditing) {
        const store = useMainStore();
        const books = await store.books.find(book => book.id === this.id);
        console.log(books);
        
        this.book = books ? { ...books } : this.book;
      } else {
        this.book = {
          idModule: "",
          publisher: "",
          price: null,
          pages: null,
          status: "new",
          comments: "",
        };
      }
    },
  },
}
</script>

<style scoped>
span.error {
  color: red;
}

</style>
