<script lang="ts">
import { defineComponent, h, onBeforeUnmount, onMounted } from "vue-demi";
import { useTonConnectUI } from "../hooks/useTonConnectUI";

export default defineComponent({
  name: "TonConnectButton",
  props: {
    buttonRootId: {
      type: String,
      required: false,
      default: "ton-connect-button",
    },
    className: {
      type: String,
      required: false,
    },
    styles: {
      type: Object,
      required: false,
    },
  },
  setup(
    props: { className?: string; styles?: any; buttonRootId?: string },
    { slots }
  ) {
    const [_, setOptions] = useTonConnectUI();
    console.log("setup", "TonConnectButton");
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
          class: props.className,
          id: props.buttonRootId || "",
          attrs: {
            id: props.buttonRootId || "",
          },
          style: { width: "fit-content", ...props.styles },
        } as any,
        (slots as any)?.default?.()
      );
    };
  },
});
</script>
