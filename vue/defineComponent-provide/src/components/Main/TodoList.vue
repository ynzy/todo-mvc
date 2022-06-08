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
<script>
import { defineComponent, computed, toRefs } from 'vue';
export default defineComponent({
  props: {
    todo: Object,
    editingTodo: [null, Object]
  },
  emits: ['update:completed', 'update:text', 'editTodo', 'doneEdit', 'cancelEdit', 'removeTodo'],
  setup(props, { emit }) {
    const { todo } = toRefs(props);
    const completed = computed({
      get() {
        return todo.value.completed;
      },
      set(value) {
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
    editFocus: (el, { value }) => value && el.focus()
  }
});
</script>
