import { ref } from 'vue';
import type { RefTodos, Todo } from './interface';

export const useAddTodo = (todos: RefTodos) => {
  const input = ref('');
  const addTodo = () => {
    const text = input.value;
    if (!text) return;
    todos.value.push({ id: todos.value.length + 1, text, completed: false });
    input.value = '';
  };
  return {
    input,
    addTodo
  };
};

export const useEditTodo = (todos: RefTodos) => {
  const editingTodo = ref<Todo | null>(null);
  const text = ref('');
  const beforeEditText = ref('');
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
  const removeTodo = (todo: Todo) => {
    todos.value.splice(todos.value.indexOf(todo), 1);
  };
  return {
    editingTodo,
    editTodo,
    doneEdit,
    cancelEdit,
    removeTodo
  };
};
