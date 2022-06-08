import { ref } from 'vue';
import { useRemoveTodo } from '@/todos/useRemoveTodo';
export const useEditTodo = () => {
  const { removeTodo } = useRemoveTodo();

  // 正在编辑的todo
  const editingTodo = ref(null);
  // 编辑之前的文本
  const beforeEditText = ref('');
  // 编辑
  const editTodo = (todo) => {
    editingTodo.value = todo;
    beforeEditText.value = todo.text;
  };
  // 完成编辑
  const doneEdit = (todo) => {
    if (!editingTodo.value) return;
    todo.text || removeTodo(todo);
    editingTodo.value = null;
  };
  // 取消编辑
  const cancelEdit = (todo) => {
    editingTodo.value = null;
    todo.text = beforeEditText.value;
  };
  return {
    editingTodo,
    editTodo,
    doneEdit,
    cancelEdit
  };
};
