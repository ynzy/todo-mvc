<template>
  <span class="todo-count"
    >进行中<strong>{{ remaining }}</strong
    >{{ pluralize(remaining) }} left
  </span>
</template>
<script lang="ts">
import type { TodosStore } from '@/todos/interface';
import { defineComponent, inject } from 'vue';
export default defineComponent({
  setup() {
    const { remaining } = inject<TodosStore>('todosStore', {} as TodosStore);
    const pluralize = (count:number) => {
      return count <= 1 ? 'item' : 'items';
    };
    return {
      remaining,
      pluralize
    };
  }
});
</script>
