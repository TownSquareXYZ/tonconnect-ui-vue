import { ref, onMounted, watch } from "vue";
import { WalletsModal, WalletsModalState } from "@tonconnect/ui";
import { useTonConnectUI } from "./useTonConnectUI";

export function useTonConnectModal() {
  const { tonConnectUI } = useTonConnectUI();
  const state = ref<WalletsModalState | null>(
    tonConnectUI?.value?.modal.state || null
  );

  onMounted(() => {
    if (tonConnectUI?.value) {
      state.value = tonConnectUI.value.modal.state;
      tonConnectUI.value.onModalStateChange((value: WalletsModalState) => {
        state.value = value;
      });
    }
  });

  watch(tonConnectUI, (newVal) => {
    if (newVal) {
      state.value = newVal.modal.state;
    }
  });

  return {
    state: state,
    open: () => tonConnectUI?.value?.modal.open(),
    close: () => tonConnectUI?.value?.modal.close(),
  };
}
