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
<script>
import { defineComponent, ref, provide } from 'vue';
import Header from '@/components/Header/Header.vue';
import Main from '@/components/Main/Main.vue';
import Count from '@/components/Footer/Count.vue';
import Filter from '@/components/Footer/Filter.vue';
import Completed from '@/components/Footer/Completed.vue';
import { useTodosStore } from '@/todos/useTodosStore';

export default defineComponent({
  components: {
    Header,
    Main,
    Count,
    Filter,
    Completed
  },
  setup() {
    const todosStore = useTodosStore();
    const { todos, remaining } = todosStore;
    provide('todosStore', todosStore);
    const visibility = ref('all');
    return {
      todos,
      visibility,
      remaining
    };
  }
});
</script>
