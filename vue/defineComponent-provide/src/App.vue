<template>
  <section class="todoapp">
    <Header />
    <Main />
    <footer class="footer">
      <Count />
      <Filter />
      <Completed  />
    </footer>
  </section>
</template>
<script>
import { defineComponent, provide } from 'vue';
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
    provide('todosStore', todosStore);
    return {
    };
  }
});
</script>
