<script setup lang="ts">
import TodoHeader from '@/components/TodoHeader.vue'
import TodoItem from '@/components/TodoItem.vue'
import TodoFooter from '@/components/TodoFooter.vue'

import { filters, useTodos } from './todos/useTodos';

const { todos, visibility, filteredTodos, remaining, allDone } = useTodos();


const removeCompleted = () => {
  todos.value = filters.active(todos.value);
};

</script>

<template>
  <section class="todoapp">
    <TodoHeader :todos="todos"/>
    <section class="main">
      <input v-model="allDone" id="toggle-all" class="toggle-all" type="checkbox" />
      <label for="toggle-all">点击完成所有事项</label>
      <ul class="todo-list">
        <TodoItem v-for="todo in filteredTodos" :key="todo.id" :todos="filteredTodos" :todo="todo">
        </TodoItem>
      </ul>
    </section>
  <TodoFooter :todos="todos" :remaining="remaining" :visibility="visibility" @remove="removeCompleted"/>
  </section>
  <footer class="info">
    <p>双击编辑todo事项</p>
    <!-- Change this out with your name and url ↓ -->
    <p>创建者<a href="https://zce.me">zce</a></p>
    <p>编辑者<a href="http://evanyou.me">Evan You</a></p>
    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
  </footer>
</template>

<style>

</style>
