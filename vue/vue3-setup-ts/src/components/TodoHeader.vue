<script setup lang="ts">
import { useAddTodo } from '@/todos/useHandlTodo';
import type { Todos } from '@/todos/interface';
import { toRefs } from 'vue';

interface IProps {
  todos: Todos;
}
const props = defineProps<IProps>();
const { todos } = toRefs(props);
const { input, addTodo } = useAddTodo(todos);
</script>
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
<style lang="scss" scoped></style>
