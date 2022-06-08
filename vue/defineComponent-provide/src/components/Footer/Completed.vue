<template>
  <button v-show="todos.length > remaining" @click="removeCompleted" class="clear-completed">
    清除已完成
  </button>
</template>
<script>
import { defineComponent, inject } from 'vue';
import { filters } from '@/utils/index';

export default defineComponent({
  emits: ['update:todos'],
  setup() {
    const { todos, remaining } = inject('todosStore');
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
