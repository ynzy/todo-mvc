<script lang="ts">
import {
  computed,
  watchEffect,
  onMounted,
  onUnmounted,
  defineComponent,
  ref,
  type Ref,
  type ComputedRef,
  type WritableComputedRef
} from 'vue';
import type { Todo, VisibleType, Filters } from './todos/interface';

import { storage } from '@/utils/storage';
import { useTodos } from './todos/useTodos';
import { useEventListener } from './hooks/useEventListener';

// const storage = {
//   get: () => JSON.parse(localStorage.getItem('latest_todos') || '[]'),
//   set: (value) => localStorage.setItem('latest_todos', JSON.stringify(value))
// };

const filters: Filters = {
  all: (todos) => todos,
  active: (todos) => todos.filter((todo) => !todo.completed),
  completed: (todos) => todos.filter((todo) => todo.completed)
};

export default defineComponent({
  setup(props) {
    const todos = useTodos();
    const visibility: Ref<VisibleType> = ref('all');
    const filteredTodos = computed(() => filters[visibility.value](todos.value));
    const input = ref('');
    const editingTodo = ref<Todo | null>(null);
    const text = ref('');
    const beforeEditText = ref('');
    const remaining: ComputedRef<number> = computed(() => filters.active(todos.value).length);
    const allDone: WritableComputedRef<boolean> = computed({
      get: () => !remaining.value,
      set: (value) => {
        todos.value.forEach((todo) => {
          todo.completed = value;
        });
      }
    });
    const onHashChange = (e: HashChangeEvent) => {
      console.log(e);
      const hash = window.location.hash.replace(/#\/?/, '');
      if (filters[hash]) {
        visibility.value = hash as VisibleType;
      } else {
        visibility.value = 'all';
        window.location.hash = '';
      }
    };
    useEventListener('hashchange', onHashChange);
    // onMounted(() => {
    //   window.addEventListener('hashchange', onHashChange);
    //   onHashChange();
    // });

    // onUnmounted(() => {
    //   window.removeEventListener('hashchange', onHashChange);
    // });

    const addTodo = () => {
      const text = input.value;
      if (!text) return;
      todos.value.push({ id: todos.value.length + 1, text, completed: false });
      input.value = '';
    };

    const removeTodo = (todo: Todo) => {
      todos.value.splice(todos.value.indexOf(todo), 1);
    };

    const editTodo = (todo: Todo) => {
      editingTodo.value = todo;
      beforeEditText.value = todo.text;
    };

    const doneEdit = (todo: Todo) => {
      if (!editingTodo.value) return;
      todo.text || removeTodo(todo);
      editingTodo.value = null;
    };

    const cancelEdit = () => {
      editingTodo.value = null;
      text.value = beforeEditText.value;
    };

    const removeCompleted = () => {
      todos.value = filters.active(todos.value);
    };

    const pluralize = (count: number) => {
      return count <= 1 ? 'item' : 'items';
    };

    return {
      todos,
      filteredTodos,
      visibility,
      input,
      allDone,
      editingTodo,
      remaining,
      // ...toRefs(state),
      addTodo,
      removeTodo,
      editTodo,
      doneEdit,
      cancelEdit,
      removeCompleted,
      pluralize
    };
  },
  directives: {
    editFocus: (el, { value }) => value && el.focus()
  }
});
</script>

<template>
  <section class="todoapp">
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
    <section class="main">
      <input v-model="allDone" id="toggle-all" class="toggle-all" type="checkbox" />
      <label for="toggle-all">点击完成所有事项</label>
      <ul class="todo-list">
        <li
          v-for="todo in filteredTodos"
          :key="todo.id"
          :class="{ completed: todo.completed, editing: editingTodo == todo }"
        >
          <div class="view">
            <input v-model="todo.completed" class="toggle" type="checkbox" />
            <label @dblclick="editTodo(todo)">{{ todo.text }}</label>
            <button @click="removeTodo" class="destroy"></button>
          </div>
          <input
            v-model.trim="todo.text"
            v-edit-focus="editingTodo == todo"
            @blur="doneEdit(todo)"
            @keyup.enter="doneEdit(todo)"
            @keyup.escape="cancelEdit(todo)"
            class="edit"
            type="text"
          />
        </li>
      </ul>
    </section>
    <footer class="footer">
      <span class="todo-count"
        >进行中<strong>{{ remaining }}</strong
        >{{ pluralize(remaining) }} left
      </span>
      <ul class="filters">
        <li><a href="#/all" :class="{ selected: visibility === 'all' }">显示所有</a></li>
        <li><a href="#/active" :class="{ selected: visibility === 'active' }">进行中</a></li>
        <li><a href="#/completed" :class="{ selected: visibility === 'completed' }">已完成</a></li>
      </ul>
      <button v-show="todos.length > remaining" @click="removeCompleted" class="clear-completed">
        清除已完成
      </button>
    </footer>
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
/* @import './assets/base.css'; */
</style>
