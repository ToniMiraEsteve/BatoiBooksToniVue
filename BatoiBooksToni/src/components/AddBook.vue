<template>
  <div>
    <Form @submit="handleSubmit" :validation-schema="mySchema">
      <legend>{{ isEditing ? 'Editar libro' : 'Añadir libro' }}</legend>
      <div>
        <label>Id:</label>
        <Field name="id" type="text" v-model="book.id" :disabled="isEditing" /><br />
        <ErrorMessage name="id"></ErrorMessage>
      </div>
      <div>
        <label>Módulo:</label>
        <Field as="select" name="modulo" v-model="book.idModule" required>
          <option value="" disabled>- Selecciona un módulo -</option>
          <option v-for="module in modules" :key="module.code" :value="module.code">
            {{ module.cliteral }}
          </option>
        </Field><br />
        <ErrorMessage name="modulo"></ErrorMessage>
      </div>
      <div>
        <label>Editorial:</label>
        <Field type="text" name="publisher" v-model="book.publisher" required /><br />
        <ErrorMessage name="publisher"></ErrorMessage>
      </div>
      <div>
        <label>Precio:</label>
        <Field type="number" name="price" v-model="book.price" required step="0.01" /><br />
        <ErrorMessage name="price"></ErrorMessage>
      </div>
      <div>
        <label>Páginas:</label>
        <Field type="number" name="pages" v-model="book.pages" required min="0" /><br />
        <ErrorMessage name="pages"></ErrorMessage>
      </div>
      <div>
        <label>Estado:</label>
        <div>
          <label><Field type="radio" name="status" v-model="book.status" value="Nuevo" required />Nuevo</label>
        </div>
        <div>
          <label><Field type="radio" name="status" v-model="book.status" value="Bueno" />Bueno</label>
        </div>
        <div>
          <label><Field type="radio" name="status" v-model="book.status" value="Usado" />Usado</label>
        </div>
        <div>
          <label><Field type="radio" name="status" v-model="book.status" value="Malo" />Malo</label>
        </div>
        <ErrorMessage name="status"></ErrorMessage>
      </div>

      <div>
        <label>Comentarios:</label>
        <textarea v-model="book.comments"></textarea>
        <span class="error"></span>
      </div>
      <button type="submit">{{ isEditing ? 'Guardar cambios' : 'Añadir' }}</button>
      <button @click.prevent="handleReset">{{ isEditing ? 'Reiniciar cambios' : 'Resetear' }}</button>
    </Form>
  </div>
</template>


<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from 'yup';
import { useMainStore } from '../store'

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  data() {
    const mySchema = yup.object({
      modulo: yup.string().required('El módulo es obligatorio'),
      publisher: yup.string().required('La editorial es obligatoria'),
      price: yup.number('Tiene que ser un numero').required('El precio es obligatorio').min(0, 'El precio no puede ser negativo'), 
      pages: yup.number('Tiene que ser un numero').required('Las paginas son obligatorias').min(0, 'Las paginas no pueden ser negativas'),
      status: yup.string().required('El estado es obligatorio'),
    })
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
      mySchema,
    }
  },
  computed: {
    modules() {
      return useMainStore().modules;
    },
  },
  async mounted() {
    const store = useMainStore();
    await store.fetchModules();
    this.isEditing = !!this.id;
    if (this.isEditing) {
      const bookRestore = store.books.find(book => book.id === this.id);
      console.log(bookRestore);
      
      if (bookRestore) {
        this.book = { ...bookRestore };
        console.log(this.book);
        
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
          const existingBook = store.books.find(book => book.id === this.book.id);
          if (existingBook) {
            await store.addMessage({type: 'error', text: 'El libro ya existe'});
          }else{
            await store.addBook(this.book);
          }
         
        }
        this.$router.push('/');
      } catch (error) {
        const store = useMainStore();
        store.addMessage({text: error.message, type: 'error'});
      }
    },
    async handleReset() {
      const store = useMainStore();
      if (this.isEditing) { 
        const bookRestore = store.books.find(bookse => bookse.id === this.id);      
        if (bookRestore) {   
          this.book =  { ...bookRestore } ;
        } else {
          store.addMessage({ text: 'El libro no se encontró para reiniciar', type: 'error' });
        }
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
span {
  color: red;
}

</style>
