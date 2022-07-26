import { ref, type Ref } from 'vue';
import { useRemoveTodo } from '@/todos/useRemoveTodo';
import type { EditTodo, Todo } from './interface';
export const useEditTodo = (): EditTodo => {
  const { removeTodo } = useRemoveTodo();

  // 正在编辑的todo
  const editingTodo: Ref<Todo | null> = ref(null);
  // 编辑之前的文本
  const beforeEditText = ref('');
  // 编辑
  const editTodo = (todo: Todo) => {
    editingTodo.value = todo;
    beforeEditText.value = todo.text;
  };
  // 完成编辑
  const doneEdit = (todo: Todo) => {
    if (!editingTodo.value) return;
    todo.text || removeTodo(todo);
    editingTodo.value = null;
  };
  // 取消编辑
  const cancelEdit = (todo: Todo) => {
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
