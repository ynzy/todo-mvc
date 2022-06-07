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
    <button v-show="todos.length > remaining" @click="removeCompleted" class="clear-completed">
      清除已完成
    </button>
  </footer>
</template>
<script>
import { defineComponent, toRefs } from 'vue';
export default defineComponent({
  props: {
    todos: Array
  },
  setup(props) {
    const { todos } = toRefs(props);
    const pluralize = (count) => {
      return count <= 1 ? 'item' : 'items';
    };
    return {};
  }
});
</script>
