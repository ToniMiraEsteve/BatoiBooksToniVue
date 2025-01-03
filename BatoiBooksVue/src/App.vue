<template>
  <div>
    <AppMenu />
    <router-view />
    <AppMessages :messages="messages" />
  </div>
</template>

<script>
import AppMenu from './components/AppMenu.vue';
import AppMessages from './components/AppMessages.vue';

export default {
  components: {
    AppMenu,
    AppMessages,
  },
};
</script>