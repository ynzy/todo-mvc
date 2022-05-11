import { defineStore } from 'pinia';
import { useEventListener } from '@/hooks/useEventListener';
import { storage } from '@/utils/storage';
import {
  computed,
  onMounted,
  ref,
  watchEffect,
  type ComputedRef,
  type Ref,
  type WritableComputedRef
} from 'vue';
import type { Filters, Todo, VisibleType } from '@/todos/interface';

export const filters: Filters = {
  all: (todos) => todos,
  active: (todos) => todos.filter((todo) => !todo.completed),
  completed: (todos) => todos.filter((todo) => todo.completed)
};

export const useTodosStore = defineStore(
  'todosStroe',
  () => {
    const todos = ref<Todo[]>([]);
    // 显示类型
    const visibility: Ref<VisibleType> = ref('all');
    // 根据类型显示todo
    const filteredTodos = computed(() => filters[visibility.value](todos.value));
    //  正在进行的todo数量
    const remaining: ComputedRef<number> = computed(() => filters.active(todos.value).length);
    //   完成所有todo
    const allDone: WritableComputedRef<boolean> = computed({
      get: () => !remaining.value,
      set: (value) => {
        todos.value.forEach((todo) => {
          todo.completed = value;
        });
      }
    });
    const removeCompleted = () => {
      todos.value = filters.active(todos.value);
    };
    /**
     * 监听浏览器改变
     * @param {HashChangeEvent} e
     */
    const onHashChange = (e: HashChangeEvent) => {
      console.log(e);
      const hash = window.location.hash.replace(/#\/?/, '');
      if (filters[hash]) {
        visibility.value = hash as VisibleType;
      } else {
        visibility.value = 'all';
        window.location.hash = '';
      }
    };
    useEventListener('hashchange', onHashChange);
    return {
      todos,
      filteredTodos,
      visibility,
      remaining,
      allDone,
      removeCompleted
    };
  },
  {
    persist: {
      key: 'todosStore',
      storage: window.localStorage,
      paths: ['todos']
    }
    // persist: true
  }
);
