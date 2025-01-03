<template>
    <div class="book-item">
      <p><strong>{{ book.module }}</strong> ({{ book.id }})</p>
      <p>Precio: {{ book.price }} €</p>
      <p>Páginas: {{ book.pages }}</p>
      <button @click="$emit('delete', book.id)">Eliminar</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      book: Object,
    },
  };
  </script>
  