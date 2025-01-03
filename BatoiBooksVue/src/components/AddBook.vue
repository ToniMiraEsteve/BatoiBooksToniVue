<template>
  <form @submit.prevent="addBook">
    <label for="id">ID:</label>
    <input id="id" v-model="newBook.id" type="text" />
    <br>
    <label for="module">Módulo:</label>
    <select id="module" v-model="newBook.module" required>
      <option value="">Seleccionar módulo</option>
      <option value="5021">5021</option>
      <option value="5025">5025</option>
    </select>
    <br>
    <label for="editorial">Editorial:</label>
    <input id="editorial" v-model="newBook.editorial" type="text" required />
    <br>
    <label for="price">Precio:</label>
    <input id="price" v-model="newBook.price" type="number" required />
    <br>
    <label for="pages">Páginas:</label>
    <input id="pages" v-model="newBook.pages" type="number" required />
    <br>
    <label>Estado:</label>
    <div>
      <label>
        <input type="radio" v-model="newBook.state" value="bueno" required />
        Bueno
      </label>
      <label>
        <input type="radio" v-model="newBook.state" value="usado" required />
        Usado
      </label>
      <label>
        <input type="radio" v-model="newBook.state" value="malo" required />
        Malo
      </label>
    </div>
    <button type="submit">Añadir</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newBook: {
        id: null, // ID opcional, se puede dejar vacío si se genera en el backend
        module: '',
        editorial: '',
        price: '',
        pages: '',
        state: '',  // Bueno, Usado o Malo
      },
    };
  },
  methods: {
    async addBook() {
      try {
        // Realizamos la petición POST al servidor para añadir el nuevo libro
        await axios.post('http://localhost:3000/books', this.newBook);
        alert('Libro añadido');
        
        // Opcionalmente, reiniciar el formulario
        this.newBook = {
          id: null,
          module: '',
          editorial: '',
          price: '',
          pages: '',
          state: '',
        };
      } catch (error) {
        console.error('Error al añadir el libro:', error);
        alert('Hubo un problema al añadir el libro.');
      }
    },
  },
};
</script>