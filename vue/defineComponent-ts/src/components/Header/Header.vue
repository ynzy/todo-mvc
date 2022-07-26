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
import { defineComponent } from 'vue';
import { useAddTodo } from '@/todos/useAddTodo';
export default defineComponent({
  setup() {
    const { input, addTodo } = useAddTodo();

    return {
      input,
      addTodo
    };
  }
});
</script>
