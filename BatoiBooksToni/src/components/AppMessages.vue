<template>
  <div>
    <div
      class="error alert alert-danger alert-dismissible"
      role="alert"
      v-for="(message, index) in messages"
      :key="index"
      :class="[
        'alert alert-dismissible',
        message.type === 'error' ? 'alert-danger' : 'alert-success'
      ]"
    > 
      {{ message }}
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        @click="remove(index)"
      >
        x
      </button>
    </div>
  </div>
</template>

<script>
import { useMainStore } from '../store'


export default {
  setup() {
    const store = useMainStore();
    return {
      messages: store.messages,
      remove: (index) => store.clearMessageAction(index),
    };
  },
};
</script>


<style scoped>
.alert-danger {
  background-color: lightcoral;
}
.alert-success {
  background-color: lightgreen;
}
</style>
