import { inject } from 'vue';
export const useRemoveTodo = () => {
  // 拿todo的数据
  const { todos } = inject('todosStore');
  /**
   * 删除todo
   * @param todo
   */
  const removeTodo = (todo) => {
    todos?.value.splice(todos.value.indexOf(todo), 1);
  };
  return {
    removeTodo
  };
};
