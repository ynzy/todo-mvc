<script setup lang="ts">
import TodoHeader from '@/components/TodoHeader.vue';
import TodoFooter from '@/components/TodoFooter.vue';
import TodoContent from '@/components/TodoContent.vue';

import { useTodos } from './todos/useTodos';

const { todos, visibility, filteredTodos, remaining, allDone, removeCompleted } = useTodos();
</script>

<template>
  <section class="todoapp">
    <TodoHeader :todos="todos" />
    <TodoContent v-model:allDone="allDone" :todos="filteredTodos" />
    <TodoFooter
      :todos="todos"
      :remaining="remaining"
      :visibility="visibility"
      @remove="removeCompleted"
    />
  </section>
  <footer class="info">
    <p>双击编辑todo事项</p>
    <!-- Change this out with your name and url ↓ -->
    <p>创建者<a href="https://zce.me">zce</a></p>
    <p>编辑者<a href="http://evanyou.me">Evan You</a></p>
    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
  </footer>
</template>

<style></style>
