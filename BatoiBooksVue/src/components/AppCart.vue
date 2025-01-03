<template>
    <div>
      <h2>Libros en el carrito</h2>
      <ul>
        <li v-for="book in cartBooks" :key="book.id">{{ book.module }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      cartBooks: {
        type: Array,
        default: () => [],
      },
    },
  };
  </script>
  