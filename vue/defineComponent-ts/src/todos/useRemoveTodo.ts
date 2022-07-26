import { inject } from 'vue';
import type { TodosStore, RemoveTodo, Todo } from './interface';

export const useRemoveTodo = (): RemoveTodo => {
  // 拿todo的数据
  const { todos } = inject<TodosStore>('todosStore', {} as TodosStore);
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
