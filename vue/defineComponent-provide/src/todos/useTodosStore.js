import { ref, watchEffect, computed } from 'vue';
import { storage } from '@/utils/storage';
import { useEventListener } from '@/hooks/useEventListener';

export const filters = {
  all: (todos) => todos,
  active: (todos) => todos.filter((todo) => !todo.completed),
  completed: (todos) => todos.filter((todo) => todo.completed)
};

export const useTodosStore = () => {
  const KEY = 'latest_todos';
  const todos = ref(storage.get(KEY) || []);
  watchEffect(() => {
    storage.set(KEY, todos.value);
  });
  // 显示类型
  const visibility = ref('all');
  // 根据类型显示对应的todos数据
  const filteredTodos = computed(() => filters[visibility.value](todos.value));
  // 进行中的数量
  const remaining = computed(() => filters.active(todos.value).length);
  // 完成所有todo操作
  const allDone = computed({
    get: () => !remaining.value,
    set: (value) => {
      todos.value.forEach((todo) => {
        todo.completed = value;
      });
    }
  });
  // 监听浏览器hash变化
  const onHashChange = () => {
    const hash = window.location.hash.replace(/#\/?/, '');
    if (filters[hash]) {
      visibility.value = hash;
    } else {
      visibility.value = 'all';
      window.location.hash = '';
    }
  };
  useEventListener('hashchange', onHashChange);
  return {
    todos,
    filteredTodos,
    remaining,
    visibility,
    allDone
  };
};
