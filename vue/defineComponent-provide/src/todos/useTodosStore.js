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
  const visibility = ref('all');
  const filteredTodos = computed(() => filters[visibility.value](todos.value));
  const remaining = computed(() => filters.active(todos.value).length);

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
    remaining
  };
};
