import { ref, onMounted, onUnmounted, Ref } from 'vue-demi';
import {
  ConnectedWallet,
  Wallet,
  WalletInfoWithOpenMethod,
} from '@tonconnect/ui';
import { useTonConnectUI } from './useTonConnectUI';

// Custom type to make properties mutable
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

function isWallet(
  value: unknown,
): value is Wallet | (Wallet & WalletInfoWithOpenMethod) {
  return (
    value !== null &&
    typeof value === 'object' &&
    'device' in value &&
    'provider' in value &&
    'account' in value
  );
}

export function useTonWallet(): Ref<
  Wallet | (Wallet & WalletInfoWithOpenMethod) | null
> {
  const { tonConnectUI } = useTonConnectUI();
  const wallet = ref<Wallet | (Wallet & WalletInfoWithOpenMethod) | null>(null);

  const updateWallet = (value: ConnectedWallet | null): void => {
    if (isWallet(value)) {
      wallet.value = value as Mutable<
        Wallet | (Wallet & WalletInfoWithOpenMethod)
      >;
    } else {
      wallet.value = null;
    }
  };

  const subscribeToWalletChanges = (): void => {
    if (!tonConnectUI) return;

    if (isWallet(tonConnectUI.wallet)) {
      wallet.value = tonConnectUI.wallet as Mutable<
        Wallet | (Wallet & WalletInfoWithOpenMethod)
      >;
    }

    const unsubscribe = tonConnectUI.onStatusChange(updateWallet);
    onUnmounted(unsubscribe);
  };

  onMounted(subscribeToWalletChanges);

  return wallet;
}
