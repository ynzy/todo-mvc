import { ref } from 'vue';
import type { RefTodos, Todo } from './interface';

export const useAddTodo = (todos: RefTodos) => {
  const input = ref('');
  /**
   * 添加todo
   * @returns
   */
  const addTodo = () => {
    const text = input.value;
    if (!text) return;
    todos.value.push({ id: Symbol(), text, completed: false });
    console.log(todos.value);

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
  /**
   * 编辑todo
   * @param todo
   */
  const editTodo = (todo: Todo) => {
    editingTodo.value = todo;
    beforeEditText.value = todo.text;
  };
  /**
   * 完成编辑
   * @param todo
   * @returns
   */
  const doneEdit = (todo: Todo) => {
    if (!editingTodo.value) return;
    todo.text || useRemoveTodo(todos).removeTodo(todo);
    editingTodo.value = null;
  };
  /**
   * 取消编辑
   */
  const cancelEdit = () => {
    editingTodo.value = null;
    text.value = beforeEditText.value;
  };

  return {
    editingTodo,
    editTodo,
    doneEdit,
    cancelEdit
  };
};

export const useRemoveTodo = (todos: RefTodos) => {
  /**
   * 删除todo
   * @param todo
   */
  const removeTodo = (todo: Todo) => {
    todos.value.splice(todos.value.indexOf(todo), 1);
  };
  return {
    removeTodo
  };
};
