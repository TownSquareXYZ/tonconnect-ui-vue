<script lang="ts">
import { defineComponent, h, onBeforeUnmount, onMounted } from "vue-demi";
import { useTonConnectUI } from "../hooks/useTonConnectUI";

export default defineComponent({
  name: "TonConnectButton",
  props: {
    buttonRootId: {
      type: String,
      default: "ton-connect-button",
    },
  },
  setup(
    props: { buttonRootId?: string },
    { slots }
  ) {
    const {setOptions} = useTonConnectUI();
    onMounted(() => {
      setOptions({ buttonRootId: props.buttonRootId });
    });

    onBeforeUnmount(() => {
      setOptions({ buttonRootId: null });
    });

    return () => {
      return h(
        "div",
        {
          id: props.buttonRootId || "",
          attrs: {
            id: props.buttonRootId || "",
          },
          style: { width: "fit-content"},
        } as any,
        (slots as any)?.default?.()
      );
    };
  },
});
</script>
