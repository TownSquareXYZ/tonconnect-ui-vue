<script lang="ts">
import { provide, defineComponent, h, isVue2, shallowRef, watch, onMounted, onUnmounted, toRaw, PropType } from "vue-demi";
import { TonConnectUI, Wallet } from "@tonconnect/ui";
import { isClientSide } from "../utils/web";
import { TonConnectUIProviderProps } from "../utils/UIProvider";

export default defineComponent({
  name: "TonConnectUIProvider",
  props: {
    options: {
      type: Object as PropType<TonConnectUIProviderProps | null>,
    },
  },
  setup(props: { options: TonConnectUIProviderProps | null },{slots}) {
    // Create a shallow reactive reference for TonConnectUI instance
    const tonConnectUI = shallowRef<TonConnectUI | null>(null);
    // Create reactive references for wallet and unsubscribe function
    const wallet = shallowRef<Wallet | null>(null);
    const unsubscribe = shallowRef(() => {});
    
    if (isClientSide() && !tonConnectUI.value) {
        unsubscribe.value();
        tonConnectUI.value = new TonConnectUI(toRaw(props.options) || {});
    }

    // Watch for changes in options
    watch(
      () => props.options,
      () => {
        if (isClientSide() && tonConnectUI.value && props.options) {
          // create new instance, but will cause warning
          // tonConnectUI.value = new TonConnectUI(toRaw(props.options) || {});

          // update options
          tonConnectUI.value.uiOptions = toRaw(props.options);
        }
      },
      { deep: true }
    );

    // Provide the TonConnectUI instance to child components
    provide("tonConnectUI", tonConnectUI.value);

    onMounted(() => {
      // Watch for changes in tonConnectUI
      watch(tonConnectUI, (actualTonConnectUI) => {
        if (actualTonConnectUI) {
          // Unsubscribe from previous subscription
          unsubscribe.value();

          // Update wallet value
          wallet.value = actualTonConnectUI.wallet;

          // Subscribe to status changes
          unsubscribe.value = actualTonConnectUI.onStatusChange((value) => {
            wallet.value = value;
          });
        }
      }, { immediate: true });
    });

    // Clean up subscription on component unmount
    onUnmounted(() => {
      unsubscribe.value();
    });

    return () => {
      if (isVue2) {
        return h("div", slots?.default as any);
      }
      return h(
        "div",
        slots.default ? (slots.default as any)() : "nothing"
      );
    };
  }
});
</script>