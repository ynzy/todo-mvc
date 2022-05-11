import { ref } from 'vue';
import type { Todo } from './interface';
import { useRemoveTodo } from './useRemoveTodo';

export const useEditTodo = () => {
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
    todo.text || useRemoveTodo().removeTodo(todo);
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
