import { ref, onMounted, onUnmounted } from 'vue-demi';
import { ConnectedWallet, Wallet, WalletInfoWithOpenMethod } from '@tonconnect/ui';
import { useTonConnectUI } from './useTonConnectUI';

export function useTonWallet() {
    const { tonConnectUI } = useTonConnectUI();
    const wallet = ref<Wallet | (Wallet & WalletInfoWithOpenMethod) | null>(
        tonConnectUI?.wallet || null
    );

    const updateWallet = (value: ConnectedWallet | null) => {
        wallet.value = value;
    };

    onMounted(() => {
        if (tonConnectUI) {
            wallet.value = tonConnectUI.wallet;
            const unsubscribe = tonConnectUI.onStatusChange((value: ConnectedWallet | null) => {
                updateWallet(value);
            });
            onUnmounted(() => {
                unsubscribe();
            });
        }
    });

    return wallet;
}
