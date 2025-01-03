<template>
  <div>
    <AppMenu />
    <div class="main-container">
      <BooksList />
      <AddBook />
      <AppAbout />
    </div>
    <AppMessages :messages="messages" />
  </div>
</template>

<script>
import AppMenu from './components/AppMenu.vue';
import AppMessages from './components/AppMessages.vue';
import BooksList from './components/BooksList.vue';
import AddBook from './components/AddBook.vue';
import AppAbout from './components/AppAbout.vue';

export default {
  components: {
    AppMenu,
    AppMessages,
    BooksList,
    AddBook,
    AppAbout,
  },
  data() {
    return {
      messages: [],
    };
  },
};
</script>
