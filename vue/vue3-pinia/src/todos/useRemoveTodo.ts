import type { Todo } from './interface';
import { useTodosStore } from '@/store/todo';

export const useRemoveTodo = () => {
  // 拿todo的数据
  const { todos } = useTodosStore();
  /**
   * 删除todo
   * @param todo
   */
  const removeTodo = (todo: Todo) => {
    todos.splice(todos.indexOf(todo), 1);
  };
  return {
    removeTodo
  };
};
