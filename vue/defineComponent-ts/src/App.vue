<template>
  <section class="todoapp">
    <Header v-model:todos="todos" />
    <Main v-model:todos="todos" :visibility="visibility" :remaining="remaining" />
    <footer class="footer">
      <Count :remaining="remaining" />
      <Filter v-model:visibility="visibility" />
      <Completed v-model:todos="todos" :remaining="remaining" />
    </footer>
  </section>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watchEffect } from 'vue';
import { filters } from '@/utils/index';
import Header from '@/components/Header/Header.vue';
import Main from '@/components/Main/Main.vue';
import Count from '@/components/Footer/Count.vue';
import Filter from '@/components/Footer/Filter.vue';
import Completed from '@/components/Footer/Completed.vue';

const storage = {
  get: () => JSON.parse(localStorage.getItem('latest_todos') || '[]'),
  set: (value) => localStorage.setItem('latest_todos', JSON.stringify(value))
};

export default defineComponent({
  components: {
    Header,
    Main,
    Count,
    Filter,
    Completed
  },
  setup(props) {
    const todos = ref(storage.get());
    const visibility = ref('all');

    const remaining = computed(() => filters.active(todos.value).length);

    // 自动收集依赖，调用一次回调，通过 Proxy 监视哪些被使用
    watchEffect(() => {
      storage.set(todos.value);
    });
    return {
      todos,
      visibility,
      remaining
    };
  }
});
</script>
