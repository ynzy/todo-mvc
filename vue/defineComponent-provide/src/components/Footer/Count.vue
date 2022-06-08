<template>
  <span class="todo-count"
    >进行中<strong>{{ remaining }}</strong
    >{{ pluralize(remaining) }} left
  </span>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    remaining: Number
  },
  setup() {
    const pluralize = (count) => {
      return count <= 1 ? 'item' : 'items';
    };
    return {
      pluralize
    };
  }
});
</script>
