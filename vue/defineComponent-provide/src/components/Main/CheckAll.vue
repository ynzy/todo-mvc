<template>
  <input v-model="allDoneValue" id="toggle-all" class="toggle-all" type="checkbox" />
  <label for="toggle-all">点击完成所有事项</label>
</template>
<script>
import { computed, defineComponent } from 'vue';
export default defineComponent({
  props: {
    allDone: Boolean
  },
  emits: ['update:allDone'],
  setup(props, { emit }) {
    const allDoneValue = computed({
      get() {
        return props.allDone;
      },
      set(value) {
        emit('update:allDone', value);
      }
    });
    return { allDoneValue };
  }
});
</script>
