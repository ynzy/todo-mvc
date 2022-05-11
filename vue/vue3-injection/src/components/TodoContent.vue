<script setup lang="ts">
import { toRefs } from 'vue';
import { useTodos } from '@/todos/useTodos';
import { useInjector } from '@/utils/injection';
import TodoItem from './TodoItem.vue';

const inject = useInjector(useTodos);
const { filteredTodos: todos, allDone } = toRefs(inject!);
</script>
<template>
  <section class="main">
    <input v-model="allDone" class="toggle-all" type="checkbox" />
    <label for="toggle-all">点击完成所有事项</label>
    <ul class="todo-list">
      <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
    </ul>
  </section>
</template>
<style lang="scss" scoped></style>
