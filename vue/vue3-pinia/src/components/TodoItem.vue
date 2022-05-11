<script setup lang="ts">
import type { Todo } from '@/todos/interface';
import { toRefs } from 'vue';
import { useRemoveTodo } from '@/todos/useRemoveTodo';
import { useEditTodo } from '@/todos/useEditTodo';

interface IProps {
  todo: Todo;
}
const props = defineProps<IProps>();
// 解构props同时保持响应式
const { todo } = toRefs(props);

const { editingTodo, editTodo, doneEdit, cancelEdit } = useEditTodo();
const { removeTodo } = useRemoveTodo();

const vEditFocus = {
  beforeMount: (el, { value }) => {
    value && el.focus();
  }
};
</script>
<template>
  <li :class="{ completed: todo.completed, editing: editingTodo == todo }">
    <div class="view">
      <input v-model="todo.completed" class="toggle" type="checkbox" />
      <label @dblclick="editTodo(todo)">{{ todo.text }}</label>
      <button @click="removeTodo(todo)" class="destroy"></button>
    </div>
    <input
      v-model.trim="todo.text"
      v-edit-focus="editingTodo == todo"
      @blur="doneEdit(todo)"
      @keyup.enter="doneEdit(todo)"
      @keyup.escape="cancelEdit()"
      class="edit"
      type="text"
    />
  </li>
</template>
<style lang="scss" scoped></style>
