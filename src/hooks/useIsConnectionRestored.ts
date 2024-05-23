import { ref, onMounted } from "vue";
import { useTonConnectUI } from "./useTonConnectUI";

export function useIsConnectionRestored() {
  const restored = ref(false);
  const { tonConnectUI } = useTonConnectUI();

  onMounted(async () => {
    if (tonConnectUI?.value) {
      await tonConnectUI.value.connectionRestored;
      restored.value = true;
    }
  });

  return { restored };
}
