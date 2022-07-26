<template>
  <button v-show="todos.length > remaining" @click="removeCompleted" class="clear-completed">
    清除已完成
  </button>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue';
import { filters } from '@/utils/index';
import type { TodosStore } from '@/todos/interface';

export default defineComponent({
  emits: ['update:todos'],
  setup() {
    const { todos, remaining } = inject<TodosStore>('todosStore', {} as TodosStore);
    const removeCompleted = () => {
      todos.value = filters.active(todos.value);
    };
    return {
      todos,
      remaining,
      removeCompleted
    };
  }
});
</script>
