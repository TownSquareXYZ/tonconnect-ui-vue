import {
    isVue2,
    shallowRef,
    PluginObject,
  } from "vue-demi";
  import { TonConnectUI } from "@tonconnect/ui";
  import { isClientSide } from "./utils/web";
  import { TonConnectUIProviderProps } from "./types";
  
  export const TonConnectUIPlugin: PluginObject<TonConnectUIProviderProps> = {
    install(app, options) {
      const tonConnectUI = shallowRef<TonConnectUI | null>(null);

      // Initialize TonConnectUI if on client side
      if (isClientSide() && !tonConnectUI.value) {
        tonConnectUI.value = new TonConnectUI(options || {});
      }

      if (isVue2) {
          app.prototype.$tonConnectUI = tonConnectUI.value;
        } else {
          // @ts-expect-error
        app.config.globalProperties.$tonConnectUI = tonConnectUI.value;
      }
    },
};
