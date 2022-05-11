<script setup lang="ts">
import TodoItem from '@/components/TodoItem.vue';
import type { Todos } from '@/todos/interface';
import { computed, toRefs } from 'vue';

interface IProps {
  allDone: boolean;
  todos: Todos;
}

const props = defineProps<IProps>();
const emit = defineEmits<{
  (e: 'update:allDone', value: boolean): void;
}>();
const { allDone, todos } = toRefs(props);
// console.log(allDone);

// 这种方式获取到的是字符串
// const changeInput = (event) => {
//   const value = (event.target as HTMLInputElement).value;
//   console.log(value);
//   emit('update:allDone', !!value);
// };

// https://staging-cn.vuejs.org/guide/components/events.html#usage-with-v-model
const value = computed<boolean>({
  get() {
    return allDone.value;
  },
  set(value) {
    emit('update:allDone', value);
  }
});
</script>
<template>
  <section class="main">
    <input v-model="value" id="toggle-all" class="toggle-all" type="checkbox" />
    <label for="toggle-all">点击完成所有事项</label>
    <ul class="todo-list">
      <TodoItem v-for="todo in todos" :key="todo.id" :todos="todos" :todo="todo"> </TodoItem>
    </ul>
  </section>
</template>
<style lang="scss" scoped></style>
