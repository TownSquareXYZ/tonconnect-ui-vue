import { ref, watch, onMounted } from "vue";
import {
  ConnectedWallet,
  Wallet,
  WalletInfoWithOpenMethod,
} from "@tonconnect/ui";
import { useTonConnectUI } from "./useTonConnectUI";

export function useTonWallet() {
  const { tonConnectUI } = useTonConnectUI();
  const wallet = ref<Wallet | (Wallet & WalletInfoWithOpenMethod) | null>(
    tonConnectUI?.value?.wallet || null
  );

  onMounted(() => {
    if (tonConnectUI?.value) {
      wallet.value = tonConnectUI.value.wallet;
      tonConnectUI.value.onStatusChange((value: ConnectedWallet | null) => {
        wallet.value = value;
      });
    }
  });

  watch(tonConnectUI, (newVal) => {
    if (newVal) {
      wallet.value = newVal.wallet;
    }
  });

  return { wallet };
}
