<script lang="ts">
import { ref, provide, defineComponent, h, isVue2 } from "vue-demi";
import { TonConnectUI } from "@tonconnect/ui";
import { isClientSide } from "../utils/web";
import { TonConnectUIProviderProps } from "../utils/UIProvider";

export default defineComponent({
  name: "TonConnectUIProvider",
  props: {
    options: {
      type: Object,
    },
  },
  setup(props: { options: TonConnectUIProviderProps }, { slots }) {
    console.log("setup");

    const tonConnectUI = ref<TonConnectUI | null>(null);
    if (isClientSide() && !tonConnectUI.value) {
      tonConnectUI.value = new TonConnectUI(props.options);
    }

    provide("tonConnectUI", tonConnectUI.value);

    console.log("provide")
    return () => {
      if (isVue2) {
        return h("div", slots?.default as any);
      }
      return h(
        "div",
        slots.default ? (slots.default as any)() : "nothing"
      );
    };
  },
  render() {
    if (isVue2) {
      return h("div", this.$slots.default ? this.$slots.default : "nothing");
    }
    return h(
      "div",
      this.$slots.default ? (this.$slots.default as any)() : "nothing"
    );
  },
});
</script>