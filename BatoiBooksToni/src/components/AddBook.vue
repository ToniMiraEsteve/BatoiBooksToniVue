<template>
  <div>
    <form @submit.prevent="handleSubmit" novalidate>
      <legend>Añadir libro</legend>
      <div>
        <label>Id:</label>
        <input type="text" v-model="book.id" disabled /><br />
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
        <!-- Aquí poned un radiobutton para cada estado -->
        <input type="radio" name="status" v-model="book.status" value="new" required />Nuevo<br />
        <input type="radio" name="status" v-model="book.status" value="good" />Bueno<br />
        <input type="radio" name="status" v-model="book.status" value="used" />Usado<br />
        <input type="radio" name="status" v-model="book.status" value="bad" />Malo<br />
        <span class="error"></span>
      </div>

      <div>
        <label>Comentarios:</label>
        <textarea v-model="book.comments"></textarea>
        <span class="error"></span>
      </div>

      <button type="submit">Añadir</button>
      <button type="reset">Reset</button>
    </form>
  </div>
</template>

<script>
import BooksRepository from '../repositories/books.repository'
import ModulesRepository from '../repositories/modules.repository'
import { store } from '../store'

export default {
  data() {
    return {
      book: {
        idModule: "",
        publisher: "",
        price: null,
        pages: null,
        status: "Nuevo",
      },
      modules: [],
      repository: new BooksRepository()
    }
  },
  mounted() {
    this.loadModules()
  },
  methods: {
    async loadModules() {
      const repository = new ModulesRepository()
      try {
        this.modules = await repository.getAllModules()
      } catch (error) {
        store.setMessageAction(error.message)
      }
    },
    async handleSubmit() {
      try {
        await this.repository.addBook(this.book)
        this.book = {}
      } catch (error) {
        store.setMessageAction(error.message)
      }
    }
  }
}
</script>

<style scoped>
span.error {
  color: red;
}
</style>
