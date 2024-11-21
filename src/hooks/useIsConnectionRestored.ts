import { ref, onMounted, Ref } from 'vue-demi';
import { useTonConnectUI } from './useTonConnectUI';

export function useIsConnectionRestored(): Ref<boolean> {
  const restored = ref(false);
  const { tonConnectUI } = useTonConnectUI();

  onMounted(() => {
    if (tonConnectUI?.closeModal) {
      tonConnectUI.connectionRestored.then(() => {
        restored.value = true;
      });
    }
  });

  return restored;
}
