import { onMounted, onUnmounted } from 'vue';

export function useEventListener(event, listener) {
  onMounted(() => {
    window.addEventListener(event, listener);
  });

  onUnmounted(() => {
    window.removeEventListener(event, listener);
  });
}
