<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { provide, ref, onMounted } from 'vue';
import {
  TonConnectUI,
  ActionConfiguration,
  Locales,
  UIPreferences,
  WalletsListConfiguration,
} from '@tonconnect/ui';
import type { ITonConnect } from '@tonconnect/ui';
import { isClientSide } from '../utils/web';

const TonConnectUIContext = Symbol('TonConnectUIContext');

export default {
  name: 'TonConnectUIProvider',
  props: {
    manifestUrl: String,
    connector: Object,
    restoreConnection: {
      type: Boolean,
      default: true,
    },
    language: {
      type: String,
      default: 'system',
    },
    widgetRootId: {
      type: String,
      default: 'div#tc-widget-root',
    },
    uiPreferences: Object,
    walletsListConfiguration: Object,
    actionsConfiguration: Object,
    enableAndroidBackHandler: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const tonConnectUI = ref(null);

    onMounted(() => {
      if (isClientSide() && !tonConnectUI.value) {
        tonConnectUI.value = new TonConnectUI(props);
      }
      provide(TonConnectUIContext, tonConnectUI);
    });
  },
};
</script>