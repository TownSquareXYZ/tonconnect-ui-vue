import { ref, onMounted, Ref } from 'vue-demi';
import { useTonConnectUI } from './useTonConnectUI';
import { WalletsModalState } from '@tonconnect/ui';

export function useTonConnectModal(): {
  state: Ref<WalletsModalState | null>;
  open: () => void;
  close: () => void;
} {
  const { tonConnectUI } = useTonConnectUI();
  const state = ref<WalletsModalState | null>(
    tonConnectUI?.modal.state || null,
  );

  onMounted(() => {
    if (tonConnectUI) {
      state.value = tonConnectUI.modal.state;

      tonConnectUI.onModalStateChange((value: WalletsModalState) => {
        state.value = value;
      });
    }
  });

  return {
    state: state,
    open: () => tonConnectUI?.modal.open(),
    close: () => tonConnectUI?.modal.close(),
  };
}
