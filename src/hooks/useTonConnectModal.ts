import { ref, onMounted } from 'vue-demi';
import { useTonConnectUI } from './useTonConnectUI';
import { WalletsModalState } from '@tonconnect/ui';

export function useTonConnectModal() {
    const { tonConnectUI } = useTonConnectUI();
    const state = ref<WalletsModalState | null>(tonConnectUI?.modal.state || null);

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
        close: () => tonConnectUI?.modal.close()
    };
}
