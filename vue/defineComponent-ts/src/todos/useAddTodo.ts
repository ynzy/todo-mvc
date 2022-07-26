import { ref, inject } from 'vue';
import type { TodosStore, AddTodo } from './interface';

export const useAddTodo = (): AddTodo => {
  const input = ref('');
  // 拿todo的数据
  const { todos } = inject<TodosStore>('todosStore', {} as TodosStore);
  /**
   * 添加todo
   * @returns
   */
  const addTodo = () => {
    const text = input.value;
    if (!text) return;
    todos.value.push({ id: Symbol(), text, completed: false });
    input.value = '';
  };
  return {
    input,
    addTodo
  };
};
