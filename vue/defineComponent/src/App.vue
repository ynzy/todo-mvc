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
</template>
<script>
import { defineComponent, ref, computed, watchEffect, onMounted, onUnmounted } from 'vue';
const storage = {
  get: () => JSON.parse(localStorage.getItem('latest_todos') || '[]'),
  set: (value) => localStorage.setItem('latest_todos', JSON.stringify(value))
};

const filters = {
  all: (todos) => todos,
  active: (todos) => todos.filter((todo) => !todo.completed),
  completed: (todos) => todos.filter((todo) => todo.completed)
};
export default defineComponent({
  setup(props) {
    const todos = ref(storage.get());
    const input = ref('');
    const visibility = ref('all');
    const editingTodo = ref(null);
    const beforeEditText = ref('');
    const remaining = computed(() => filters.active(todos.value).length);
    const filteredTodos = computed(() => filters[visibility.value](todos.value));
    const allDone = computed({
      get: () => !remaining.value,
      set: (value) => {
        todos.value.forEach((todo) => {
          todo.completed = value;
        });
      }
    });
    // 自动收集依赖，调用一次回调，通过 Proxy 监视哪些被使用
    watchEffect(() => {
      storage.set(todos.value);
    });

    onMounted(() => {
      window.addEventListener('hashchange', onHashChange);
      onHashChange();
    });

    onUnmounted(() => {
      window.removeEventListener('hashchange', onHashChange);
    });

    const onHashChange = () => {
      const hash = window.location.hash.replace(/#\/?/, '');
      if (filters[hash]) {
        visibility.value = hash;
      } else {
        visibility.value = 'all';
        window.location.hash = '';
      }
    };

    const addTodo = () => {
      const text = input.value;
      if (!text) return;
      todos.value.push({ id: todos.value.length + 1, text, completed: false });
      input.value = '';
    };

    const removeTodo = (todo) => {
      todos.value.splice(todos.value.indexOf(todo), 1);
    };

    const editTodo = (todo) => {
      editingTodo.value = todo;
      beforeEditText.value = todo.text;
    };

    const doneEdit = (todo) => {
      if (!editingTodo.value) return;
      todo.text || removeTodo(todo);
      editingTodo.value = null;
    };

    const cancelEdit = (todo) => {
      editingTodo.value = null;
      todo.text = beforeEditText.value;
    };

    const removeCompleted = () => {
      todos.value = filters.active(todos.value);
    };

    const pluralize = (count) => {
      return count <= 1 ? 'item' : 'items';
    };

    return {
      todos,
      input,
      visibility,
      editingTodo,
      beforeEditText,
      remaining,
      filteredTodos,
      allDone,
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
