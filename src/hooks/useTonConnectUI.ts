import { DefineComponent, getCurrentInstance, isVue2 } from 'vue-demi';
import { TonConnectUI, TonConnectUiOptions } from '@tonconnect/ui';
import { checkProvider } from '../utils/errors';
import { isServerSide } from '../utils/web';

type CustomInstance = DefineComponent & {
  proxy?: {
    $tonConnectUI?: TonConnectUI;
  };
  appContext?: {
    app: {
      config: {
        globalProperties: {
          $tonConnectUI?: TonConnectUI;
        };
      };
    };
  };
};

export function useTonConnectUI(): {
  tonConnectUI: TonConnectUI | null;
  setOptions: (options: TonConnectUiOptions) => void;
  error?: string;
} {
  if (isServerSide()) {
    return {
      tonConnectUI: null as TonConnectUI | null,
      setOptions: () => {
        // empty
      },
    };
  }

  const instance = getCurrentInstance() as CustomInstance | null;

  if (!instance) {
    return {
      tonConnectUI: null,
      setOptions: () => {
        // empty
      },
      error: 'Vue instance not found',
    };
  }

  const tonConnectUI: TonConnectUI | null = isVue2
    ? (instance.proxy?.$tonConnectUI ?? null)
    : (instance.appContext?.app?.config?.globalProperties?.$tonConnectUI ??
      null);

  if (!tonConnectUI) {
    throw new Error('TonConnect is not available');
  }

  checkProvider(tonConnectUI);

  // 明确返回类型为 void
  const setOptions = (options: TonConnectUiOptions): void => {
    tonConnectUI.uiOptions = options;
  };

  return {
    tonConnectUI,
    setOptions,
  };
}
