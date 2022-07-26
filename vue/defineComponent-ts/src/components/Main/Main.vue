<template>
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
</template>
<script lang="ts">
import { defineComponent, ref, toRefs, computed } from 'vue';
import { filters } from '@/utils/index';
import CheckAll from '@/components/Main/CheckAll.vue';
import TodoList from '@/components/Main/TodoList.vue';
export default defineComponent({
  components: {
    CheckAll,
    TodoList
  },
  props: {
    todos: Array,
    visibility: String,
    remaining: Number
  },
  emits: ['update:todos'],
  setup(props, { emit }) {
    const { todos, remaining, visibility } = toRefs(props);
    const filteredTodos = computed(() => filters[visibility.value](todos.value));
    const todosValue = computed({
      get: () => todos.value,
      set: (v) => {
        emit('update:todos', v);
      }
    });
    const allDone = computed({
      get: () => !remaining,
      set: (value) => {
        todosValue.value.forEach((todo) => {
          todo.completed = value;
        });
      }
    });

    const editingTodo = ref(null);
    const beforeEditText = ref('');
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
    const removeTodo = (todo) => {
      todos.value.splice(todos.value.indexOf(todo), 1);
    };

    return {
      allDone,
      editingTodo,
      filteredTodos,
      editTodo,
      doneEdit,
      cancelEdit,
      removeTodo
    };
  }
});
</script>
