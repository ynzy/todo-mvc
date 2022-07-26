<template>
  <input v-model="allDoneValue" id="toggle-all" class="toggle-all" type="checkbox" />
  <label for="toggle-all">点击完成所有事项</label>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
export default defineComponent({
  props: {
    allDone: {
      type: Boolean,
      required: true
    }
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
