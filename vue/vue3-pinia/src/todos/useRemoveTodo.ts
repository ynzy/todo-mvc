import { useInjector } from '@/utils/injection';
import type { Todo } from './interface';
import { useTodos } from './useTodos';

export const useRemoveTodo = () => {
  // 拿todo的数据
  const injector = useInjector(useTodos);
  const todos = injector?.todos;
  /**
   * 删除todo
   * @param todo
   */
  const removeTodo = (todo: Todo) => {
    todos?.value.splice(todos.value.indexOf(todo), 1);
  };
  return {
    removeTodo
  };
};
