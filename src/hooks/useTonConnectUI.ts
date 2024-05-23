import { ref, inject, onMounted } from "vue";
import { TonConnectUI, TonConnectUiOptions } from "@tonconnect/ui";
import { checkProvider } from "../utils/errors";
import { isServerSide } from "../utils/web";

export function useTonConnectUI() {
  const tonConnectUI = inject<TonConnectUI | null>("tonConnectUI", null);
  const setOptions = (options: TonConnectUiOptions) => {
    if (tonConnectUI?.value) {
      tonConnectUI.value.uiOptions = options;
    }
  };

  onMounted(() => {
    if (isServerSide()) {
      return;
    }

    checkProvider(tonConnectUI?.value);
  });

  return { tonConnectUI, setOptions };
}
