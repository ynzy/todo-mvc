<template>
  <section class="todoapp">
    <Header v-model:input="input" @addTodo="addTodo" />
    <section class="main">
      <CheckAll v-model:allDone="allDone" />
      <ul class="todo-list">
        <TodoList
          v-for="todo in filteredTodos"
          :key="todo.id"
          :todo="todo"
          :editingTodo="editingTodo"
          v-model:completed="todo.completed"
          v-model:text="todo.text"
          @editTodo="editTodo"
          @doneEdit="doneEdit"
          @cancelEdit="cancelEdit"
          @removeTodo="removeTodo"
        />
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
<script>
import { defineComponent, ref, computed, watchEffect, onMounted, onUnmounted } from 'vue';
import Header from '@/components/Header.vue';
import CheckAll from '@/components/CheckAll.vue';
import TodoList from '@/components/TodoList.vue';
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
  components: {
    Header,
    CheckAll,
    TodoList
  },
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
  }
});
</script>
