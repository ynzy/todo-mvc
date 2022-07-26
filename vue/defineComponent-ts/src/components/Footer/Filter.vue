<template>
  <ul class="filters">
    <li><a href="#/all" :class="{ selected: visibility === 'all' }">显示所有</a></li>
    <li><a href="#/active" :class="{ selected: visibility === 'active' }">进行中</a></li>
    <li><a href="#/completed" :class="{ selected: visibility === 'completed' }">已完成</a></li>
  </ul>
</template>
<script lang="ts">
import { inject, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const { visibility } = inject('todosStore');

    return {
      visibility
    };
  }
});
</script>
