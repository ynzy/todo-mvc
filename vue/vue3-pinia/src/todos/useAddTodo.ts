import { ref } from 'vue';
import { useTodosStore } from '@/store/todo';

export const useAddTodo = () => {
  const input = ref('');
  const { todos } = useTodosStore();
  /**
   * 添加todo
   * @returns
   */
  const addTodo = () => {
    const text = input.value;
    if (!text) return;
    todos.push({ id: Symbol(), text, completed: false });
    console.log(todos);

    input.value = '';
  };
  return {
    input,
    addTodo
  };
};
