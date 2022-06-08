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
<script>
import { ref, defineComponent, inject } from 'vue';
export default defineComponent({
  setup() {
    const { todos } = inject('todosStore');
    const input = ref('');
    const addTodo = () => {
      const text = input.value;
      if (!text) return;
      todos.value.push({ id: todos.value.length + 1, text, completed: false });
      input.value = '';
    };
    return {
      input,
      addTodo
    };
  }
});
</script>
