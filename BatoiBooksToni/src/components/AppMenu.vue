<template>
  <nav>
    <ul>
      <li><router-link to="/">Ver Libros</router-link></li>
      <li><router-link to="/add-book">Nuevo Libro</router-link></li>
      <li><router-link to="/cart">Ver Carrito</router-link></li>
      <li><router-link to="/about">Acerca de...</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'AppMenu',
};
</script>
