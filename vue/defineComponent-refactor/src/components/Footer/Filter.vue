<template>
  <ul class="filters">
    <li><a href="#/all" :class="{ selected: visibility === 'all' }">显示所有</a></li>
    <li><a href="#/active" :class="{ selected: visibility === 'active' }">进行中</a></li>
    <li><a href="#/completed" :class="{ selected: visibility === 'completed' }">已完成</a></li>
  </ul>
</template>
<script>
import { computed, defineComponent, onMounted, onUnmounted } from 'vue';
import { filters } from '@/utils/index';

export default defineComponent({
  props: {
    visibility: String
  },
  emits: ['update:visibility'],
  setup(props, { emit }) {
    const visibilityValue = computed({
      get: () => props.visibility,
      set: (v) => {
        emit('update:visibility', v);
      }
    });
    onMounted(() => {
      window.addEventListener('hashchange', onHashChange);
      onHashChange();
    });

    onUnmounted(() => {
      window.removeEventListener('hashchange', onHashChange);
    });

    const onHashChange = () => {
      const hash = window.location.hash.replace(/#\/?/, '');
      if (filters[hash]) {
        visibilityValue.value = hash;
      } else {
        visibilityValue.value = 'all';
        window.location.hash = '';
      }
    };
    return {};
  }
});
</script>
