<template>
    <div v-if="messages.length" class="messages">
      <div v-for="(message, index) in messages" :key="index" class="message">
        {{ message }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      messages: {
        type: Array,
        default: () => [],
      },
    },
  };
  </script>