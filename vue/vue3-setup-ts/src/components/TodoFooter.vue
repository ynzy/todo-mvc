<script setup lang="ts">
import { toRefs } from 'vue';
import type { Todos, VisibleType } from '@/todos/interface';
import { filters } from '@/todos/useTodos';

interface IProps {
  todos: Todos;
  remaining: number;
  visibility: VisibleType;
}
const props = defineProps<IProps>();
const { todos, remaining, visibility } = toRefs(props);

const pluralize = (count: number) => {
  return count <= 1 ? 'item' : 'items';
};

const emit = defineEmits<{
  (e: 'remove'): void;
}>();

const handleRemove = () => {
  emit('remove');
};
</script>
<template>
  <footer class="footer">
    <span class="todo-count"
      >进行中<strong>{{ remaining }}</strong
      >{{ pluralize(remaining) }} left
    </span>
    <ul class="filters">
      <li><a href="#/all" :class="{ selected: visibility === 'all' }">显示所有</a></li>
      <li><a href="#/active" :class="{ selected: visibility === 'active' }">进行中</a></li>
      <li><a href="#/completed" :class="{ selected: visibility === 'completed' }">已完成</a></li>
    </ul>
    <button v-show="todos.length > remaining" @click="handleRemove" class="clear-completed">
      清除已完成
    </button>
  </footer>
</template>
<style lang="scss" scoped></style>
