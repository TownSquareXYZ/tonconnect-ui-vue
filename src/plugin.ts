// import {
//     inject,
//     shallowRef,
//     watch,
//     toRaw,
//     Vue2,
//     isVue3,
//     App,
//     Plugin,
//   } from "vue-demi";
//   import { TonConnectUI, Wallet } from "@tonconnect/ui";
//   import { isClientSide } from "../utils/web";
//   import { TonConnectUIProviderProps } from "../utils/UIProvider";
//   import { tonConnectUIKey } from "../injection-keys";
  
//   export const TonConnectUIPlugin: Plugin = {
//     install(app: App | typeof Vue2, options?: TonConnectUIProviderProps) {
//       const tonConnectUI = shallowRef<TonConnectUI | null>(null);
//       const wallet = shallowRef<Wallet | null>(null);
//       let unsubscribe = () => {};
  
//       if (!app) {
//         throw new Error("TonConnectUI plugin is not installed");
//       }
  
//       // Initialize TonConnectUI if on client side
//       if (isClientSide() && !tonConnectUI.value) {
//         tonConnectUI.value = new TonConnectUI(options || {});
//       }
  
//       const updateTonConnectUIOptions = (newOptions: TonConnectUIProviderProps) => {
//         if (isClientSide() && tonConnectUI.value) {
//           tonConnectUI.value.uiOptions = toRaw(newOptions);
//         }
//       };
  
//       if (isVue3) {
//         const vueApp = app as App;
//         vueApp.config.globalProperties.$tonConnectUI = () =>
//           inject<TonConnectUI | null>(tonConnectUIKey);
//         vueApp.provide(tonConnectUIKey, tonConnectUI.value);
//         vueApp.config.globalProperties.$updateTonConnectUIOptions = updateTonConnectUIOptions;
//       } else {
//         const vueApp = app as typeof Vue2;
//         vueApp.prototype.$tonConnectUI = () => inject(tonConnectUIKey);
//         vueApp.prototype.$updateTonConnectUIOptions = updateTonConnectUIOptions;
//       }
  
//       // Add a mixin to handle lifecycle hooks
//       app.mixin({
//         mounted() {
//           watch(
//             () => tonConnectUI.value,
//             (actualTonConnectUI) => {
//               if (actualTonConnectUI) {
//                 unsubscribe();
//                 wallet.value = actualTonConnectUI.wallet;
//                 unsubscribe = actualTonConnectUI.onStatusChange((value) => {
//                   wallet.value = value;
//                 });
//               }
//             },
//             { immediate: true }
//           );
//         },
//         beforeDestroy() {
//           unsubscribe();
//         },
//       });
//     },
//   };
  
//   export default TonConnectUIPlugin;