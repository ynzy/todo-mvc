import { onMounted, onUnmounted } from 'vue';

export function useEventListener<Names extends string>(event: Names, listener) {
  onMounted(() => {
    window.addEventListener(event, listener);
  });

  onUnmounted(() => {
    window.removeEventListener(event, listener);
  });
}
