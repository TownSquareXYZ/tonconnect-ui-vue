<script lang="ts">
import {
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  isVue2,
  PropType,
} from 'vue-demi';
import { useTonConnectUI } from '../hooks/useTonConnectUI';

export default defineComponent({
  name: 'TonConnectButton',
  props: {
    buttonRootId: {
      type: String as PropType<string>,
      default: 'ton-connect-button',
    },
  },
  setup(props, { slots }) {
    const { setOptions } = useTonConnectUI();

    onMounted(() => {
      setOptions({ buttonRootId: props.buttonRootId });
    });

    onBeforeUnmount(() => {
      setOptions({ buttonRootId: null });
    });

    return () => {
      const vnodeData = {
        style: { width: 'fit-content' },
        ...(isVue2
          ? { attrs: { id: props.buttonRootId || '' } }
          : { id: props.buttonRootId || '' }),
      };

      return h('div', vnodeData, slots.default ? slots.default() : null);
    };
  },
});
</script>
