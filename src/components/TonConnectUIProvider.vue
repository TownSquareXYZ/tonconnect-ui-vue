<script lang="ts">
import { provide, defineComponent, h, shallowRef, watch, onMounted, onUnmounted, toRaw, PropType } from "vue-demi";
import { TonConnectUI, Wallet } from "@tonconnect/ui";
import { isClientSide } from "../utils/web";
import { TonConnectUIProviderProps } from "../utils/UIProvider";
import { tonConnectUIKey } from "../injection-keys";

export default defineComponent({
  name: "TonConnectUIProvider",
  props: {
    options: {
      type: Object as PropType<TonConnectUIProviderProps | null>,
    },
  },
  setup(props: { options: TonConnectUIProviderProps | null },{slots}) {
    let tonConnectUI: TonConnectUI | null = null;
    
    if (isClientSide() && !tonConnectUI) {
      tonConnectUI = new TonConnectUI(props.options || {});
    }
    
    provide(tonConnectUIKey, tonConnectUI);

    watch(
      () => props.options,
      () => {
        if (isClientSide() && tonConnectUI && props.options) {
          tonConnectUI.uiOptions = toRaw(props.options);
        }
      },
      { deep: true }
    );

    return () => {
      return h(
        "div",
        slots.default?.() ?? null
      );
    };
  }
});
</script>