import { storage } from '@/utils/storage';
import { onMounted, ref, watchEffect } from 'vue';
import type { Todo } from './interface';

export const useTodos = () => {
  const KEY = 'latest_todos';
  const todos = ref<Todo[]>([]);
  // 自动收集依赖，调用一次回调，通过 Proxy 监视哪些被使用
  watchEffect(() => {
    storage.set(KEY, todos.value);
  });

  onMounted(() => {
    todos.value = storage.get<Todo[]>(KEY) || [];
  });
  return todos;
};
