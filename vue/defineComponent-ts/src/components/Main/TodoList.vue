<template>
  <li :class="{ completed: completed, editing: editingTodo == todo }">
    <div class="view">
      <input v-model="completed" class="toggle" type="checkbox" />
      <label @dblclick="editTodo">{{ text }}</label>
      <button @click="removeTodo" class="destroy"></button>
    </div>
    <input
      v-model.trim="text"
      v-edit-focus="editingTodo == todo"
      @blur="doneEdit"
      @keyup.enter="doneEdit"
      @keyup.escape="cancelEdit"
      class="edit"
      type="text"
    />
  </li>
</template>
<script lang="ts">
import type { Todo } from '@/todos/interface';
import { defineComponent, computed, toRefs, type PropType } from 'vue';
export default defineComponent({
  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true
    },
    editingTodo: {
      type: Object as PropType<null | Todo>, // 类型断言
      required: true
    }
  },
  emits: ['update:completed', 'update:text', 'editTodo', 'doneEdit', 'cancelEdit', 'removeTodo'],
  setup(props, { emit }) {
    const { todo,editingTodo } = toRefs(props);
    const completed = computed({
      get() {
        return todo.value.completed || false;
      },
      set(value:boolean) {
        emit('update:completed', value);
      }
    });
    const text = computed({
      get() {
        return todo.value.text;
      },
      set(value) {
        emit('update:text', value);
      }
    });
    const editTodo = () => {
      emit('editTodo', todo.value);
    };
    const doneEdit = () => {
      emit('doneEdit', todo.value);
    };
    const cancelEdit = () => {
      emit('cancelEdit', todo.value);
    };
    const removeTodo = () => {
      emit('removeTodo', todo.value);
    };
    return {
      completed,
      text,
      editTodo,
      doneEdit,
      cancelEdit,
      removeTodo
    };
  },
  directives: {
    editFocus: (el:HTMLInputElement, { value }) => value && el.focus()
  }
});
</script>
