<template>
  <header class="header">
    <h1>todos</h1>
    <input
      v-model.trim="input"
      @keyup.enter="addTodo"
      class="new-todo"
      placeholder="你需要做什么"
      autocomplete="off"
      autofocus
    />
  </header>
</template>
<script lang="ts">
import { computed, ref, toRefs, defineComponent } from 'vue';
export default defineComponent({
  props: {
    todos: Array
  },
  emits: ['update:todos'],
  setup(props, { emit }) {
    const { todos } = toRefs(props);
    const input = ref('');
    const todosValue = computed({
      get: () => todos.value,
      set: (v) => {
        emit('update:todos', v);
      }
    });
    const addTodo = () => {
      const text = input.value;
      if (!text) return;
      todosValue.value.push({ id: todosValue.value.length + 1, text, completed: false });
      input.value = '';
    };

    return {
      input,
      addTodo
    };
  }
});
</script>
