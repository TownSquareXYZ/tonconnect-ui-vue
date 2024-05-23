<template>
  <div
    :id="buttonRootId"
    :class="className"
    :style="{ width: 'fit-content', ...style }"
  ></div>
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useTonConnectUI } from '../hooks/useTonConnectUI';

const buttonRootId = 'ton-connect-button';

export default {
  name: 'TonConnectButton',
  props: {
    className: String,
    style: Object,
  },
  setup(props) {
    const { setOptions } = useTonConnectUI();

    onMounted(() => {
      setOptions({ buttonRootId });
    });

    onUnmounted(() => {
      setOptions({ buttonRootId: null });
    });

    return {
      buttonRootId,
      className: props.className,
      style: props.style,
    };
  },
};
</script>