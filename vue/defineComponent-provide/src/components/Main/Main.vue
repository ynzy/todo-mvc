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
<script>
import { defineComponent, inject } from 'vue';
import CheckAll from '@/components/Main/CheckAll.vue';
import TodoList from '@/components/Main/TodoList.vue';
import { useRemoveTodo } from '@/todos/useRemoveTodo';
import { useEditTodo } from '@/todos/useEditTodo';
export default defineComponent({
  components: {
    CheckAll,
    TodoList
  },
  setup() {
    const { filteredTodos, visibility, remaining, allDone } = inject('todosStore');
    const { removeTodo } = useRemoveTodo();
    const { editingTodo, editTodo, doneEdit, cancelEdit } = useEditTodo();

    return {
      allDone,
      filteredTodos,
      remaining,
      visibility,
      editingTodo,
      editTodo,
      doneEdit,
      cancelEdit,
      removeTodo
    };
  }
});
</script>
