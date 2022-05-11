<script setup lang="ts">
import TodoItem from './TodoItem.vue';
import { useTodosStore } from '@/store/todo';
import { storeToRefs } from 'pinia';
const todosStore = useTodosStore();
const { filteredTodos: todos, allDone } = storeToRefs(todosStore);
</script>
<template>
  <section class="main">
    <input v-model="allDone" id="toggle-all" class="toggle-all" type="checkbox" />
    <label for="toggle-all">点击完成所有事项</label>
    <ul class="todo-list">
      <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
    </ul>
  </section>
</template>
<style lang="scss" scoped></style>
