import { getCurrentInstance, isVue2 } from 'vue-demi';
import { TonConnectUI, TonConnectUiOptions } from '@tonconnect/ui';
import { checkProvider } from '../utils/errors';
import { isServerSide } from '../utils/web';

export function useTonConnectUI() {
    const globalPropertiesMap = isVue2
        ? getCurrentInstance()?.proxy
        // @ts-expect-error
        : getCurrentInstance().appContext.app.config.globalProperties;

    const tonConnectUI = globalPropertiesMap.$tonConnectUI;

    if (isServerSide()) {
        return {
            tonConnectUI: null as unknown as TonConnectUI,
            setOptions: () => {},
        };
    }

    const setOptions = (options: TonConnectUiOptions) => {
        if (tonConnectUI && tonConnectUI) {
            tonConnectUI.uiOptions = options;
        }
    };

    checkProvider(tonConnectUI);

    return {
        tonConnectUI,
        setOptions,
    };
}
