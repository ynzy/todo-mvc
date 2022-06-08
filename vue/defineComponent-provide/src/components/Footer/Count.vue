<template>
  <span class="todo-count"
    >进行中<strong>{{ remaining }}</strong
    >{{ pluralize(remaining) }} left
  </span>
</template>
<script>
import { defineComponent, inject } from 'vue';
export default defineComponent({
  setup() {
    const { remaining } = inject('todosStore');
    const pluralize = (count) => {
      return count <= 1 ? 'item' : 'items';
    };
    return {
      remaining,
      pluralize
    };
  }
});
</script>
