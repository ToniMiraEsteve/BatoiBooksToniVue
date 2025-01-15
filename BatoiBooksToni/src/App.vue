<script>
import AppMenu from './components/AppMenu.vue'
import AppMessages from './components/AppMessages.vue'
import BooksList from './components/BooksList.vue'
import AddBook from './components/AddBook.vue'
import AppAbout from './components/AppAbout.vue'
import AppCart from './components/AppCart.vue'


export default {
  components: {
    AppMenu,
    AppMessages,
    BooksList,
    AddBook,
    AppAbout,
    AppCart
}
}
</script>

<template>
  <header>
    <a href="http://www.cipfpbatoi.es" target="_blank">
      <img src="/logoBatoi.png" class="logo" alt="CIP FP Batoi" />
    </a>
    <h1>BatoiBooks</h1>
  </header>
  <div>
    <app-menu></app-menu>
    <router-view />
  </div>

  <footer>Juan Segura - DWEC</footer>
</template>

<style scoped></style>
