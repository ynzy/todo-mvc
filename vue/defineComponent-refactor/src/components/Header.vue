<template>
  <header class="header">
    <h1>todos</h1>
    <input
      v-model.trim="inputValue"
      @keyup.enter="addTodo"
      class="new-todo"
      placeholder="你需要做什么"
      autocomplete="off"
      autofocus
    />
  </header>
</template>
<script>
import { computed, defineComponent } from 'vue';
export default defineComponent({
  props: {
    input: String
  },
  emits: ['update:input', 'addTodo'],
  setup(props, { emit }) {
    const inputValue = computed({
      get() {
        return props.input;
      },
      set(v) {
        emit('update:input', v);
      }
    });
    const addTodo = () => {
      emit('addTodo');
    };
    return {
      inputValue,
      addTodo
    };
  }
});
</script>
