import { ref, inject } from 'vue';

export const useAddTodo = () => {
  const input = ref('');
  // 拿todo的数据
  const { todos } = inject('todosStore');
  /**
   * 添加todo
   * @returns
   */
  const addTodo = () => {
    const text = input.value;
    if (!text) return;
    todos?.value.push({ id: Symbol(), text, completed: false });
    console.log(todos?.value);

    input.value = '';
  };
  return {
    input,
    addTodo
  };
};
