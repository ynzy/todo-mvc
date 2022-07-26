<template>
  <button v-show="todos.length > remaining" @click="removeCompleted" class="clear-completed">
    清除已完成
  </button>
</template>
<script lang="ts">
import { defineComponent, toRefs, computed } from 'vue';
import { filters } from '@/utils/index';

export default defineComponent({
  props: {
    todos: Array,
    remaining: Number
  },
  emits: ['update:todos'],
  setup(props, { emit }) {
    const { todos } = toRefs(props);
    const todosValue = computed({
      get: () => todos.value,
      set: (v) => {
        emit('update:todos', v);
      }
    });
    const removeCompleted = () => {
      todosValue.value = filters.active(todos.value);
    };
    return {
      removeCompleted
    };
  }
});
</script>
